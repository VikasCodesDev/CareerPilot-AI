import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppProviders } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--cp-font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareerPilot AI — Autonomous Career Intelligence",
  description:
    "AI-powered career guidance with autonomous agents for resume optimization, interview preparation, and personalized roadmaps.",
  keywords: [
    "career AI",
    "resume optimization",
    "interview preparation",
    "career roadmap",
    "autonomous agents",
  ],
  openGraph: {
    title: "CareerPilot AI — Autonomous Career Intelligence",
    description:
      "Navigate your career with intelligent precision. Autonomous AI agents for every stage of your professional journey.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
