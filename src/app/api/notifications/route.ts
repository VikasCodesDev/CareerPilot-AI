import { apiSuccess, apiError, withErrorHandler } from "@/lib/utils/api";
import { NotificationService } from "@/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/config/auth.config";
import { ERROR_MESSAGES } from "@/constants";

export const GET = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const notifications = await NotificationService.getUnread(session.user.id);
  return apiSuccess({ notifications, count: notifications.length }, "Notifications retrieved successfully");
});

export const PATCH = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  await NotificationService.markAllRead(session.user.id);
  return apiSuccess({ marked: true }, "All notifications marked as read");
});
