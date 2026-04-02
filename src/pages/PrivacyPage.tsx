import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "@/lib/motion";

export function PrivacyPage() {
  return (
    <div className="page-section max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.medium, ease: EASE_OUT }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 leading-relaxed text-neutral-600">
          This is a demo placeholder. A production NestRoom site would describe data collection,
          cookies, and your rights here.
        </p>
      </motion.div>
    </div>
  );
}
