import type { Transition, Variants } from "framer-motion";

export const EASE_ENTRANCE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.01 },
};

export const glowPulse: Variants = {
  initial: { boxShadow: "0 0 0 rgba(124, 58, 237, 0)" },
  animate: {
    boxShadow: [
      "0 0 0 rgba(124, 58, 237, 0)",
      "0 0 40px rgba(124, 58, 237, 0.32)",
      "0 0 0 rgba(124, 58, 237, 0)",
    ],
    transition: {
      duration: 2.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: EASE_ENTRANCE,
};

export const revealViewport = {
  once: true,
  margin: "-80px" as const,
};
