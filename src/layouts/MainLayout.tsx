import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { pageTransition, pageTransitionHome } from "@/lib/motion";

export function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const pt = isHome ? pageTransitionHome : pageTransition;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="flex-1"
          initial={pt.initial}
          animate={pt.animate}
          exit={pt.exit}
          transition={pt.transition}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
