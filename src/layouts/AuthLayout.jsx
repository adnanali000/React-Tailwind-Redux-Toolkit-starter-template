import React from "react";
import { Outlet, Link } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}
