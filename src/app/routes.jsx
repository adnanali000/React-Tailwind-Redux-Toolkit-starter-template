import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "./paths.js";

// ✅ use the real files now
import { ProtectedRoute } from "../routes/ProtectedRoute.jsx";
import { PublicRoute } from "../routes/PublicRoute.jsx";
import { DashboardLayout } from "../layouts/DashboardLayout.jsx";
import { AuthLayout } from "../layouts/AuthLayout.jsx";
import { DashboardHome } from "../pages/DashboardHome.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { BlogListPage } from "../features/blog/pages/BlogListPage.jsx";
import { BlogCreatePage } from "../features/blog/pages/BlogCreatePage.jsx";
import { BlogEditPage } from "../features/blog/pages/BlogEditPage.jsx";

// if you don’t already have a NotFoundPage component, you can create one in `src/pages/NotFoundPage.jsx`
import { NotFoundPage } from "../pages/NotFoundPage.jsx";

export const routes = [
  // Redirect root -> /login (unauthenticated entry)
  { path: PATHS.root, element: <Navigate to={PATHS.login} replace /> },

  // Public routes
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [{ path: PATHS.login, element: <LoginPage /> }],
      },
    ],
  },

  // Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: PATHS.dashboard, element: <DashboardHome /> },

          // Blog
          { path: PATHS.blog.root, element: <BlogListPage /> },
          { path: PATHS.blog.new, element: <BlogCreatePage /> },
          { path: PATHS.blog.edit(), element: <BlogEditPage /> },

          // 404 inside shell
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },

  // Global catch-all
  { path: "*", element: <NotFoundPage /> },
];
