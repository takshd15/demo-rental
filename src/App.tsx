import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";

const HomePage = lazy(() =>
  import("@/HomePage").then((m) => ({ default: m.HomePage })),
);

function RouteFallback() {
  return (
    <div
      className="flex min-h-[40vh] flex-1 items-center justify-center bg-white"
      role="status"
      aria-label="Loading page"
    >
      <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
