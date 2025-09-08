import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.jsx";

export function PublicRoute({ redirectTo = "/dashboard" }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6 text-sm text-gray-500">Checking auth…</div>;
  if (user) return <Navigate to={redirectTo} replace />;  // 👈 bounce if logged in

  return <Outlet />;
}
