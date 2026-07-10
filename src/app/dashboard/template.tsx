"use client";

import { motion } from "framer-motion";

import { pageFade, dashboardTransition } from "@/features/dashboard/lib/motion";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageFade}
      transition={dashboardTransition}
    >
      {children}
    </motion.div>
  );
}
