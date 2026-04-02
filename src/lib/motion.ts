/**
 * Shared motion tokens — fast, premium, consistent (Airbnb / Stripe–style).
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.22,
  base: 0.32,
  medium: 0.38,
  slow: 0.45,
  /** Home / hero entrance — premium landing feel */
  page: 0.52,
} as const;

/** Full page route transition (used in MainLayout) */
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: DURATION.medium, ease: EASE_OUT },
};

/** Slightly longer enter for home — matches landing polish */
export const pageTransitionHome = {
  ...pageTransition,
  transition: { duration: DURATION.page, ease: EASE_OUT },
};

/**
 * Home: root container — only staggers direct section children (no opacity on self).
 */
export const homePageRootVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.04,
    },
  },
} as const;

/** Home: stagger parent for hero lines / nested blocks (headline → copy → CTAs → form). */
export const homeHeroParentVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.02,
    },
  },
} as const;

/** Single line / block: fade, rise, subtle scale-in */
export const homeHeroLineVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.page * 0.88, ease: EASE_OUT },
  },
} as const;

/**
 * Section that fades as a unit (About, Roommate, CTA) when nested under homePageRootVariants.
 */
export const homeLeafSectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.page, ease: EASE_OUT },
  },
} as const;

/**
 * Featured (and similar): section moves up once, then staggers header + cards.
 */
export const homeFeaturedParentVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.page,
      ease: EASE_OUT,
      staggerChildren: 0.085,
      delayChildren: 0.08,
    },
  },
} as const;

/** How it works: headline row then nested step cards */
export const homeDenseBlockVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.page,
      ease: EASE_OUT,
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
} as const;

/** Section headline + copy reveal on scroll */
export const sectionReveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

/** Parent: stagger children */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

/** Child of staggerContainer */
export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};

export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: DURATION.fast },
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.96, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 10 },
  transition: { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.85 },
};

export const imageHover = {
  scale: 1.03,
  transition: { duration: DURATION.medium, ease: EASE_OUT },
};
