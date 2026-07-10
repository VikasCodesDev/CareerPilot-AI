import type { Metadata } from "next";

import { DashboardLayout } from "@/features/dashboard/components/layout/dashboard-layout";

export const metadata: Metadata = {
  title: "Dashboard — CareerPilot AI",
  description: "Your autonomous career intelligence workspace.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
