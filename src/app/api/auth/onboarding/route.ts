import { NextRequest } from "next/server";
import { withErrorHandler, apiError, apiSuccess } from "@/lib/utils/api";
import { onboardingSchema } from "@/features/auth/schemas";
import { AuthService } from "@/services";

export const PATCH = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const parsed = onboardingSchema.safeParse(body);

  if (!parsed.success) {
    return apiError(
      parsed.error.issues[0]?.message || "Invalid onboarding payload.",
      400,
    );
  }

  const updated = await AuthService.updateOnboarding(
    parsed.data.userId,
    parsed.data.metadata,
  );
  return apiSuccess(updated, "Onboarding data updated successfully.");
});
