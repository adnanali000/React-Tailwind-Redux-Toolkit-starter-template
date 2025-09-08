import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.jsx";

export function ProtectedRoute({ redirectTo = "/login" }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-6 text-sm text-gray-500">Checking auth…</div>;
  if (!user) return <Navigate to={redirectTo} replace state={{ from: location }} />;

  return <Outlet />;
}
