import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes.jsx";

function RouteFallback() {
  return (
    <div className="p-6 text-sm text-gray-500">
      Loading…
    </div>
  );
}

export default function AppRouter() {
  const element = useRoutes(routes);
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}