import { Suspense } from "react";
import { VerificationScreen } from "@/features/auth/components/verification-screen";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center p-6 text-zinc-500">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
          <span className="mt-2 text-xs">Loading verification...</span>
        </div>
      }
    >
      <VerificationScreen />
    </Suspense>
  );
}
