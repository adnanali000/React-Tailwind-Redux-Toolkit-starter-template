import React from "react";

export function DashboardHome() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Overview
        </h1>
        <p className="text-sm text-gray-500">
          Welcome to your admin dashboard. (stub)
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat title="Posts" value="—" />
        <Stat title="Drafts" value="—" />
        <Stat title="Views" value="—" />
      </div>
    </section>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}
