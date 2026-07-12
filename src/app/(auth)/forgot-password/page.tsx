import { Suspense } from "react";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center p-6 text-zinc-500">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
          <span className="mt-2 text-xs">Loading form...</span>
        </div>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
}
