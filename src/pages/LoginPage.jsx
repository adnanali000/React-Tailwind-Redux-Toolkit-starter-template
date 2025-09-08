import React, { useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.jsx";
import { PATHS } from "../app/paths.js";

export function LoginPage() {
  const nav = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const from = location.state?.from?.pathname || PATHS.dashboard;

  if (user) return <Navigate to={from} replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      nav(from, { replace: true });
    } catch (err) {
      // If backend rejects and DEV fallback is off, surface the error
      setError("Login failed. Check credentials or enable DEV_AUTH=1 for dev login.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
      <p className="text-sm text-gray-500 mb-6">
        Dev fallback (if enabled): admin@example.com / admin123
      </p>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <input id="email" type="email" required value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"/>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="password">Password</label>
          <input id="password" type="password" required value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"/>
        </div>
        <button type="submit" className="w-full rounded-xl bg-black text-white py-2 font-medium hover:opacity-90">
          Sign in
        </button>
      </form>
    </div>
  );
}
