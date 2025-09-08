import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar.jsx";
import { Topbar } from "../components/Topbar.jsx";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
