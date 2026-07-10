"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] text-foreground font-sans px-4 py-12">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Aurora Ambient Blobs */}
      <div className="absolute -inset-[10px] opacity-30 filter blur-[90px] pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 animate-pulse mix-blend-screen opacity-40" 
             style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 animate-pulse mix-blend-screen opacity-30" 
             style={{ animationDuration: "16s", animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-purple-500 opacity-20 mix-blend-screen" 
             style={{ filter: "blur(120px)" }} />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo / Brand Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white font-extrabold text-lg shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-transform duration-300 group-hover:scale-105">
              CP
            </span>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              CareerPilot<span className="text-violet-500">.AI</span>
            </span>
          </Link>
          <p className="mt-2 text-xs text-zinc-400 tracking-wider uppercase font-medium">
            Autonomous Career Intelligence System
          </p>
        </motion.div>
        
        {/* Main Glass Box of Child Pages */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full rounded-2xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl p-8 shadow-2xl shadow-black/80"
        >
          {children}
        </motion.div>
        
        {/* Footer info lockup */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-xs text-zinc-600"
        >
          Secure system authentication &middot; Powered by Auth.js
        </motion.p>
      </div>
    </div>
  );
}
