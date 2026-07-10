import { getServerSession } from "next-auth";

import { authOptions } from "@/features/auth/config/auth.config";
import { RoadmapOverview } from "@/features/roadmap";
import { roadmapFeatureRepository } from "@/features/roadmap/repository";
import { RoadmapRecommendationService } from "@/features/roadmap/services";
import { connectToDatabase } from "@/lib/db";

export default async function CareerRoadmapPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <RoadmapOverview roadmap={null} recommendations={[]} authenticated={false} />;
  }

  await connectToDatabase();
  const roadmap = await roadmapFeatureRepository.getLatestRoadmap(session.user.id);
  const recommendations = roadmap
    ? RoadmapRecommendationService.recommendFromRoadmap(roadmap)
    : [];

  return <RoadmapOverview roadmap={roadmap} recommendations={recommendations} authenticated />;
}
