import axios from "axios";
import { API_URL } from "./config";

let memoryAccessToken = null;
export const setAccessToken = (t) => { memoryAccessToken = t || null; };
export const getAccessToken = () => memoryAccessToken;

export const http = axios.create({
  baseURL: API_URL || "http://localhost:3000/api",
  withCredentials: true,              // send cookies
  xsrfCookieName: "XSRF-TOKEN",       // server sets this non-HttpOnly cookie
  xsrfHeaderName: "X-XSRF-TOKEN",     // axios copies cookie -> header automatically
});

// Attach bearer (if you choose to use one) + smart Content-Type
http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  const isForm = config.data instanceof FormData;
  if (isForm) {
    delete config.headers["Content-Type"];  // let browser set multipart boundary
  } else if (config.data && typeof config.data === "object") {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// One-shot refresh on 401, then retry original request
let isRefreshing = false;
let queue = [];
const flush = (err, token) => {
  queue.forEach(p => (err ? p.reject(err) : p.resolve(token)));
  queue = [];
};

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error?.response?.status;

    if (status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => queue.push({ resolve, reject }))
          .then((t) => {
            if (t) original.headers["Authorization"] = `Bearer ${t}`;
            original._retry = true;
            return http(original);
          });
      }

      original._retry = true;
      isRefreshing = true;
      try {
        const refreshURL = (API_URL || "http://localhost:3000/api") + "/auth/refresh";
        const { data } = await axios.post(refreshURL, null, { withCredentials: true });

        // If backend returns a (short-lived) accessToken, keep it in memory only
        if (data?.accessToken) setAccessToken(data.accessToken);

        flush(null, data?.accessToken || null);
        return http(original);
      } catch (e) {
        setAccessToken(null);
        flush(e, null);
        throw e;
      } finally {
        isRefreshing = false;
      }
    }

    throw error;
  }
);

// Minimal helper facade (resolves to response.data)
export const api = {
  get: (url, config) => http.get(url, config).then(r => r.data),
  post: (url, data, config) => http.post(url, data, config).then(r => r.data),
  put: (url, data, config) => http.put(url, data, config).then(r => r.data),
  patch: (url, data, config) => http.patch(url, data, config).then(r => r.data),
  del: (url, config) => http.delete(url, config).then(r => r.data),
};
