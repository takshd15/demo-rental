import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "@/lib/motion";

type Variant = "primary" | "secondary" | "inverse";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-nest-yellow text-neutral-900 shadow-card hover:bg-nest-yellow-hover focus-visible:outline-nest-yellow",
  secondary:
    "bg-white text-neutral-900 border border-neutral-200 shadow-sm hover:bg-neutral-50 focus-visible:outline-neutral-400",
  inverse:
    "bg-neutral-900 text-white border border-neutral-900 shadow-card hover:bg-neutral-800 focus-visible:outline-neutral-900 [&_svg]:text-white",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...rest
}: Props) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: DURATION.fast, ease: EASE_OUT }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
