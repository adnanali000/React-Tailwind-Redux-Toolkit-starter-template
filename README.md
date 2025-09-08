# React Admin Starter Template

A **production-ready React starter** with a clean, scalable folder structure.  
Built with **React, Vite, TailwindCSS, Redux Toolkit, and Axios (with secure interceptors)**.

> ⚡️ Although the example uses a Dashboard + Blog module, this structure is designed for **any React app** — SaaS, admin panel, e-commerce, or internal tools.

---

## ✨ Features

- 🔒 **Secure Authentication**
  - In-memory JWT access token
  - HttpOnly refresh cookie
  - Dev fallback (`DEV_AUTH=1`) with dummy credentials
- 🗂 **Feature-first folder structure**
  - Each feature has its own `api`, `slice`, `components`, and `pages`
- ⚛️ **Redux Toolkit**
  - Entity adapters for normalized data
  - Async thunks for API calls
  - Memoized selectors
- 🎨 **TailwindCSS UI**
  - Clean, consistent styling (`rounded-xl`, `px-3 py-2`, etc.)
- 🌐 **Axios with interceptors**
  - Auto attaches token
  - Handles refresh on 401

  - `--upload` flag for modules needing file upload (FormData)
- 📦 **Vite-powered**
  - Fast HMR, simple config

---

## 📁 Folder Structure


src/
# ├─ app/ # global app wiring (routes, layouts, providers, paths)
# ├─ components/ # shared UI components
# ├─ features/ # domain-driven feature modules
# │ ├─ blog/
# │ │ ├─ api.js
# │ │ ├─ blogSlice.js
# │ │ ├─ components/
#  │ │ └─ pages/
# │ └─ users/
# │ ├─ api.js
# │ ├─ usersSlice.js
# │ ├─ components/
# │ └─ pages/
# ├─ layouts/ # DashboardLayout, AuthLayout
# ├─ lib/ # http.js (axios client), helpers
# ├─ providers/ # AuthProvider
# ├─ routes/ # ProtectedRoute, PublicRoute
# ├─ store/ # Redux store, hooks
# └─ main.jsx # entry



---

## 🚀 Getting Started

```bash
# 1. clone
git clone https://github.com/your-username/React-Tailwind-Redux-Toolkit-starter-template.git
cd React-Tailwind-Redux-Toolkit-starter-template

# 2. install
npm install

# 3. config.js
# set API_URL=http://localhost:5000
# optionally: DEV_AUTH=1 for dummy login, email => admin@example.com , password => admin123


# 4. run
npm run dev


