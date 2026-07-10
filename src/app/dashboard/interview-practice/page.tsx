import { getServerSession } from "next-auth";

import { authOptions } from "@/features/auth/config/auth.config";
import { InterviewDashboard } from "@/features/interview";
import {
  InterviewHistoryService,
  InterviewRecommendationService,
} from "@/features/interview/services";

export default async function InterviewPracticePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <InterviewDashboard
        session={null}
        history={[]}
        recommendations={InterviewRecommendationService.generate(null)}
        authenticated={false}
      />
    );
  }

  const [interviewSession, history] = await Promise.all([
    InterviewHistoryService.getLatest(session.user.id),
    InterviewHistoryService.listHistory(session.user.id, { page: 1, limit: 6 }),
  ]);

  return (
    <InterviewDashboard
      session={interviewSession}
      history={history.data}
      recommendations={InterviewRecommendationService.generate(interviewSession)}
      authenticated
    />
  );
}
