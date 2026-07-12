import { NextRequest } from "next/server";
import { withErrorHandler, apiError, apiSuccess } from "@/lib/utils/api";
import { authRegisterSchema } from "@/features/auth/schemas";
import { AuthService } from "@/services";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  const parsed = authRegisterSchema.safeParse(body);

  if (!parsed.success) {
    return apiError(
      parsed.error.issues[0]?.message || "Invalid registration payload.",
      400,
    );
  }

  const user = await AuthService.registerUser(parsed.data);
  return apiSuccess(
    user,
    "Registration successful. Check the console for verification details.",
    201,
  );
});
