import { NextRequest } from "next/server";
import { withErrorHandler, apiError, apiSuccess } from "@/lib/utils/api";
import { forgotPasswordSchema } from "@/features/auth/schemas";
import { AuthService } from "@/services";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message || "Invalid request.", 400);
  }

  await AuthService.sendPasswordResetLink(parsed.data.email);
  return apiSuccess(
    null,
    "Password reset instructions were sent if the account exists.",
  );
});
