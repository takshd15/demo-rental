import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "@/lib/motion";

export function AboutPage() {
  return (
    <div className="page-section max-w-3xl !mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.slow, ease: EASE_OUT }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          About NestRoom
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-600">
          NestRoom is a modern rental experience inspired by the best of hospitality marketplaces:
          crisp listings, verified hosts, and a calm interface that gets out of your way.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-600">
          Whether you are relocating, planning a long stay, or splitting rent with new roommates, we
          focus on trust signals — clear photos, honest descriptions, and tools to filter what
          matters to you.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-600">
          This site is a front-end demonstration with mock data and UI-only authentication flows.
        </p>
      </motion.div>
    </div>
  );
}
