import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { DURATION, EASE_OUT, sectionReveal } from "@/lib/motion";

/** After home page section stagger (~6 blocks × 0.14s + last block motion) */
const FOOTER_HOME_DELAY = 1.12;

export function Footer() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const motionProps = isHome
    ? {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: DURATION.page,
          ease: EASE_OUT,
          delay: FOOTER_HOME_DELAY,
        },
      }
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.15 as const },
        variants: sectionReveal,
      };

  return (
    <motion.footer
      className="mt-auto border-t border-neutral-200 bg-neutral-50"
      {...motionProps}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-900"
            >
              <span aria-hidden>🏡</span> NestRoom
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Rentals and roommates, without the noise. Built for calm browsing and clear next
              steps.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-14 gap-y-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Legal
              </p>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li>
                  <Link
                    className="text-neutral-600 transition-colors hover:text-neutral-900"
                    to="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-neutral-600 transition-colors hover:text-neutral-900"
                    to="/terms"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Contact
              </p>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li>
                  <a
                    className="text-neutral-600 transition-colors hover:text-neutral-900"
                    href="mailto:hello@nestroom.com"
                  >
                    hello@nestroom.com
                  </a>
                </li>
                <li>
                  <a
                    className="text-neutral-600 transition-colors hover:text-neutral-900"
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-neutral-200/90 pt-8 text-center text-sm text-neutral-500">
          © 2026 NestRoom
        </p>
      </div>
    </motion.footer>
  );
}
