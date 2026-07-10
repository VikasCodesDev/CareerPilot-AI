import { getServerSession } from "next-auth";

import { authOptions } from "@/features/auth/config/auth.config";
import { ATSAnalysisDashboard } from "@/features/ats";
import { ATSHistoryService } from "@/features/ats/services";

export default async function ResumeAnalysisPage() {
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
