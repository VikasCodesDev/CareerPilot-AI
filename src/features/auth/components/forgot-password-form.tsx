"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { forgotPasswordSchema, ForgotPasswordInput } from "../schemas";
import { AuthService } from "../services/auth.service";

export function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError: setFieldError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setError(null);
    setSuccess(false);

    // Validate email via Zod
    const validationResult = forgotPasswordSchema.safeParse(data);
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        setFieldError(issue.path[0] as keyof ForgotPasswordInput, {
          type: "manual",
          message: issue.message,
        });
      });
      return;
    }

    try {
      await AuthService.sendResetLink(data.email);
      setSuccess(true);
    } catch (e: unknown) {
      const err = e as Error;
      setError(err.message || "Something went wrong. Please check the email address.");
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
          Reset password
        </h1>
        <p className="text-sm text-zinc-400">
          Enter your email to receive a password reset link
        </p>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-5 text-sm text-green-400 font-sans"
          >
            <CheckCircle className="size-8 text-green-500" />
            <div className="space-y-1">
              <span className="font-semibold block text-white text-base">Mail sent!</span>
              We&apos;ve dispatched verification links to your address if an account exists.
            </div>
            <Link
              href="/login"
              className="mt-2 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-4"
            >
              Return to login
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                <div>
                  <span className="font-semibold">Reset failed:</span> {error}
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-white" />
                    <span>Sending email...</span>
                  </>
                ) : (
                  <span>Send Reset Instructions</span>
                )}
              </button>
            </form>

            <div className="text-center text-sm text-zinc-400 font-sans">
              Remembered password?{" "}
              <Link
                href="/login"
                className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
