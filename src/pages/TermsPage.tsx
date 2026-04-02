import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "@/lib/motion";

export function TermsPage() {
  return (
    <div className="page-section max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.medium, ease: EASE_OUT }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">Terms</h1>
        <p className="mt-4 leading-relaxed text-neutral-600">
          This is a demo placeholder. Terms of use, liability, and listing rules would appear in a
          live product.
        </p>
      </motion.div>
    </div>
  );
}
