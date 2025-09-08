import React from "react";
import { Link } from "react-router-dom";

export function PostTable({ posts = [], onDelete }) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Updated</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-500">/{p.slug}</div>
              </td>
              <td className="p-3 capitalize">{p.status}</td>
              <td className="p-3 text-gray-500">
                {p.updatedAt ? new Date(p.updatedAt).toLocaleString() : "—"}
              </td>
              <td className="p-3 text-right space-x-2">
                <Link
                  to={`/dashboard/blog/${p.id}/edit`}
                  className="px-2 py-1 rounded-lg border"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete?.(p.id)}
                  className="px-2 py-1 rounded-lg border text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-500">
                No posts yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
