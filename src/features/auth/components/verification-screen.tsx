"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { AuthService } from "../services/auth.service";

export function VerificationScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email address";

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Focus helper
  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, val: string) => {
    // Only accept numeric entries
    if (val && !/^[0-9]$/.test(val)) return;

    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
    setError(null);

    // Auto-focus next input
    if (val && index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }

    // Submit if all 6 digits entered
    if (newCode.every((digit) => digit !== "")) {
      handleSubmitCode(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0 && inputsRef.current[index - 1]) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputsRef.current[index - 1]?.focus();
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
      setError(null);
    }
  };

  const handleSubmitCode = async (fullCode: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const isValid = await AuthService.verifyCode(email, fullCode);
      if (isValid) {
        setVerified(true);
        // Delay redirect slightly so they see verification success
        setTimeout(() => {
          router.push("/login?verified=true");
        }, 2000);
      } else {
        setError("Invalid verification code. Please enter standard numeric digit code.");
        // Reset code on error
        setCode(Array(6).fill(""));
        inputsRef.current[0]?.focus();
      }
    } catch (e: unknown) {
      const err = e as Error;
      setError(err.message || "Verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    try {
      await AuthService.sendResetLink(email);
      alert("A new verification code has been dispatched to your email address!");
    } catch (e: unknown) {
      const err = e as Error;
      setError(err.message || "Failed to resend code.");
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 border border-violet-500/20 mb-2">
          <ShieldCheck className="size-5" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
          Verify your email
        </h1>
        <p className="text-sm text-zinc-400 px-2 leading-relaxed">
          We sent a verification code to <span className="font-semibold text-zinc-200 block truncate">{email}</span>
        </p>
      </div>

      <AnimatePresence mode="wait">
        {verified ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-5 text-sm text-green-400 font-sans"
          >
            <CheckCircle className="size-8 text-green-500 animate-bounce" />
            <div className="space-y-1">
              <span className="font-semibold block text-white text-base">Email Verified!</span>
              Redirecting you to login screen...
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                <div>
                  <span className="font-semibold block mb-0.5">Verification failed:</span> {error}
                </div>
              </motion.div>
            )}

            <div className="flex justify-center gap-2">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputsRef.current[idx] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  disabled={isSubmitting}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="size-11 rounded-lg border border-white/[0.08] bg-zinc-950/40 text-center text-lg font-bold text-white outline-none transition-all focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50"
                />
              ))}
            </div>

            <div className="text-center font-sans">
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                  <Loader2 className="size-4 animate-spin" />
                  Checking code...
                </div>
              ) : (
                <div className="text-xs text-zinc-500">
                  Enter any 6 numeric digits (example: <span className="font-mono text-zinc-400">123456</span>) to proceed.
                </div>
              )}
            </div>

            <div className="text-center text-sm text-zinc-400 pt-2 font-sans">
              Didn&apos;t receive the code?{" "}
              <button
                onClick={handleResend}
                disabled={isSubmitting}
                className="font-semibold text-violet-400 hover:text-violet-300 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Resend Code
              </button>
            </div>
            
            <div className="text-center">
              <Link
                href="/login"
                className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors underline underline-offset-4 font-sans"
              >
                Back to login
              </Link>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
