import React from "react";
import { Link, useLocation } from "react-router-dom";

export function Topbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center px-3 md:px-6 sticky top-0 z-10">
      <div className="md:hidden mr-2">
        <Link
          to="/dashboard"
          className="inline-flex items-center px-3 py-2 rounded-lg border text-sm"
        >
          Menu
        </Link>
      </div>
      <div className="flex-1">
        <Breadcrumbs />
      </div>
    </header>
  );
}

function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500">
      <ol className="flex items-center gap-1 flex-wrap">
        <li>
          <Link to="/dashboard" className="font-semibold text-gray-800">
            Admin
          </Link>
        </li>
        {parts.map((seg, i) => (
          <li key={i} className="flex items-center gap-1">
            <span>/</span>
            <span className="capitalize">{seg}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
