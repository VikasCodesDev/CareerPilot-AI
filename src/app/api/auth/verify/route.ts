import { NextRequest } from "next/server";
import { withErrorHandler, apiError, apiSuccess } from "@/lib/utils/api";
import { verifyEmailSchema } from "@/features/auth/schemas";
import { AuthService } from "@/services";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const parsed = verifyEmailSchema.safeParse(body);

  if (!parsed.success) {
    return apiError(
      parsed.error.issues[0]?.message || "Invalid verification code.",
      400,
    );
  }

  const isValid = await AuthService.verifyEmailCode(
    parsed.data.email,
    parsed.data.code,
  );
  if (!isValid) {
    return apiError(
      "Verification failed. Please check your email and code.",
      400,
    );
  }

  return apiSuccess(null, "Email verified successfully.");
});
