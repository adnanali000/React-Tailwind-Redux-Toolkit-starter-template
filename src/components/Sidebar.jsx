import React from "react";
import { NavLink, Link } from "react-router-dom";
import { PATHS } from "../app/paths.js";
import { useAuth } from "../providers/AuthProvider.jsx";

export function Sidebar() {
  const { user, logout } = useAuth();

  const Item = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-xl px-3 py-2 text-sm font-medium hover:bg-gray-100 ${
          isActive ? "bg-gray-100" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r bg-white">
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <Link to={PATHS.dashboard} className="text-xl font-bold tracking-tight">
          Admin
        </Link>
      </div>

      <nav className="p-3 space-y-6 overflow-y-auto">
        <div>
          <p className="px-2 text-xs font-semibold uppercase text-gray-500">Dashboard</p>
          <ul className="mt-2 space-y-1">
            <li><Item to={PATHS.dashboard}>Overview</Item></li>
          </ul>
        </div>

        <div>
          <p className="px-2 text-xs font-semibold uppercase text-gray-500">Blog</p>
          <ul className="mt-2 space-y-1">
            <li><Item to={PATHS.blog.root}>All Posts</Item></li>
            <li><Item to={PATHS.blog.new}>Create Post</Item></li>
          </ul>
        </div>
      </nav>

      <div className="mt-auto p-4 border-t">
        {user ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{user.email}</p>
              <p className="text-xs text-gray-500">Logged in</p>
            </div>
            <button
              onClick={logout}
              className="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-xs text-gray-500">Not signed in</p>
        )}
      </div>
    </aside>
  );
}
