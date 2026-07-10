"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Target, Loader2, AlertCircle } from "lucide-react";
import { signupSchema, SignupInput } from "../schemas";
import { AuthService } from "../services/auth.service";

export function SignupForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      careerGoal: "",
    },
  });

  const onSubmit = async (data: SignupInput) => {
    setAuthError(null);

    // Validate fields using Zod
    const validationResult = signupSchema.safeParse(data);
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        setError(issue.path[0] as keyof SignupInput, {
          type: "manual",
          message: issue.message,
        });
      });
      return;
    }

    try {
      await AuthService.registerUser(data);
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (e: unknown) {
      const err = e as Error;
      setAuthError(err.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
          Create an account
        </h1>
        <p className="text-sm text-zinc-400">
          Get started with CareerPilot AI today
        </p>
      </div>

      <AnimatePresence mode="wait">
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
            <div>
              <span className="font-semibold">Registration failed:</span> {authError}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/[0.08] bg-zinc-950/40 py-2.5 pr-4 pl-10 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50"
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
            <input
              {...register("email")}
              type="email"
              placeholder="name@example.com"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/[0.08] bg-zinc-950/40 py-2.5 pr-4 pl-10 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                disabled={isSubmitting}
                className="w-full rounded-xl border border-white/[0.08] bg-zinc-950/40 py-2.5 pr-4 pl-10 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                disabled={isSubmitting}
                className="w-full rounded-xl border border-white/[0.08] bg-zinc-950/40 py-2.5 pr-4 pl-10 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-400 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Optional Career Goal */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Career Goal / Target Role (Optional)
          </label>
          <div className="relative">
            <Target className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
            <input
              {...register("careerGoal")}
              type="text"
              placeholder="e.g. Full Stack Developer, AI Researcher"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/[0.08] bg-zinc-950/40 py-2.5 pr-4 pl-10 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin text-white" />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </button>
      </form>

      <div className="text-center text-sm text-zinc-400 font-sans">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
