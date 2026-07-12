import { getServerSession } from "next-auth";

import { ATSAnalysisDashboard } from "@/features/ats";
import { ATSHistoryService } from "@/features/ats/services";
import { authOptions } from "@/features/auth/config/auth.config";

export default async function ResumeScorePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <ATSAnalysisDashboard analysis={null} history={[]} authenticated={false} />;
  }

  const [analysis, history] = await Promise.all([
    ATSHistoryService.getLatest(session.user.id),
    ATSHistoryService.listHistory(session.user.id, { page: 1, limit: 5 }),
  ]);

  return (
    <ATSAnalysisDashboard
      analysis={analysis}
      history={history.data}
      authenticated
    />
  );
}
