import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const ListingsPage = lazy(() =>
  import("@/pages/ListingsPage").then((m) => ({ default: m.ListingsPage })),
);
const ListingDetailsPage = lazy(() =>
  import("@/pages/ListingDetailsPage").then((m) => ({ default: m.ListingDetailsPage })),
);
const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import("@/pages/RegisterPage").then((m) => ({ default: m.RegisterPage })),
);
const PostRoomPage = lazy(() =>
  import("@/pages/PostRoomPage").then((m) => ({ default: m.PostRoomPage })),
);
const RoommateFinderPage = lazy(() =>
  import("@/pages/RoommateFinderPage").then((m) => ({ default: m.RoommateFinderPage })),
);
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazy(() =>
  import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const PrivacyPage = lazy(() =>
  import("@/pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage })),
);
const TermsPage = lazy(() =>
  import("@/pages/TermsPage").then((m) => ({ default: m.TermsPage })),
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
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="listings/:id" element={<ListingDetailsPage />} />
          <Route path="post" element={<PostRoomPage />} />
          <Route path="roommates" element={<RoommateFinderPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
