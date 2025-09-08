/* @refresh reload */
import React, { useMemo, useState, useContext, useEffect } from "react";
import { http, setAccessToken } from "../lib/http.js";
import { DEV_AUTH } from "../lib/config.js";

const AuthContext = React.createContext(null);

// Dev toggle: only use rehydrate fallback when explicitly enabled
const IS_DEV_AUTH = DEV_AUTH === "1";
const DEV_EMAIL = "admin@example.com";
const DEV_PASSWORD = "admin123";
// Session storage key (dev only)
const SS_KEY = "dev.auth.cache"; // { email, token }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---- SECURE BOOTSTRAP ON HARD REFRESH ----
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Try secure refresh using HttpOnly cookie (preferred)
        const refresh = await http.post("/auth/refresh", null);
        const accessToken = refresh?.data?.accessToken;
        if (accessToken) setAccessToken(accessToken);

        const me = await http.get("/auth/me");
        if (!cancelled) setUser(me.data);
      } catch {
        // If secure refresh fails (e.g., backend off) and DEV fallback is enabled,
        // rehydrate from sessionStorage to survive hard refresh during development.
        if (IS_DEV_AUTH) {
          try {
            const raw = sessionStorage.getItem(SS_KEY);
            if (raw) {
              const parsed = JSON.parse(raw);
              if (parsed?.email && parsed?.token) {
                setAccessToken(parsed.token); // still in-memory only
                if (!cancelled) setUser({ email: parsed.email });
              }
            }
          } catch {}
        }
        if (!cancelled && !IS_DEV_AUTH) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  // ---- LOGIN / LOGOUT ----
  async function login(email, password) {
    setLoading(true);
    try {
      // Try real backend first
      const res = await http.post("/auth/login", { email, password });
      if (res?.data?.accessToken) setAccessToken(res.data.accessToken);

      if (res?.data?.user) {
        setUser(res.data.user);
      } else {
        const me = await http.get("/auth/me");
        setUser(me.data);
      }

      // If login succeeded with backend, clear any dev cache
      if (IS_DEV_AUTH) sessionStorage.removeItem(SS_KEY);
    } catch (e) {
      // DEV fallback only
      if (IS_DEV_AUTH && email === DEV_EMAIL && password === DEV_PASSWORD) {
        const token = "dev-dummy-token-" + Date.now();
        setAccessToken(token);
        setUser({ email: DEV_EMAIL, role: "admin", name: "Dev Admin" });
        // cache minimal info so hard refresh in dev keeps you signed in
        sessionStorage.setItem(SS_KEY, JSON.stringify({ email: DEV_EMAIL, token }));
      } else {
        throw e;
      }
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await http.post("/auth/logout");
    } catch {
      // ignore network errors on logout in dev
    } finally {
      setAccessToken(null);
      setUser(null);
      if (IS_DEV_AUTH) sessionStorage.removeItem(SS_KEY);
    }
  }

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
