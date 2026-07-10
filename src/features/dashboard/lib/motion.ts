import type { Transition, Variants } from "framer-motion";

export const DASHBOARD_EASE = [0.16, 1, 0.3, 1] as const;

export const pageFade: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

export const sidebarVariants: Variants = {
  expanded: { width: 260 },
  collapsed: { width: 72 },
};

export const drawerVariants: Variants = {
  closed: { x: "-100%" },
  open: { x: 0 },
};

export const overlayVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.01 },
};

export const staggerGrid: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const gridItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const dropdownVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: -4 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: -4 },
};

export const dashboardTransition: Transition = {
  duration: 0.28,
  ease: DASHBOARD_EASE,
};
