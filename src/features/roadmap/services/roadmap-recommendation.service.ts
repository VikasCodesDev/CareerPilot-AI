import { RoadmapTemplateService } from "@/features/roadmap/services/roadmap-template.service";
import type { Roadmap, SupportedRoadmapRole } from "@/features/roadmap/types";

export class RoadmapRecommendationService {
  static recommendFromRoadmap(roadmap: Roadmap): string[] {
    const missingSkills = RoadmapTemplateService.getMissingSkills(
      roadmap.targetRole,
      roadmap.currentSkills
    );
    const openTasks = roadmap.tasks.filter((task) => task.status !== "completed");

    return [
      missingSkills.length > 0
        ? `Prioritize ${missingSkills.slice(0, 3).join(", ")} for ${roadmap.targetRole}.`
        : "Maintain momentum by moving into portfolio and interview practice.",
      openTasks[0]
        ? `Continue with: ${openTasks[0].title}.`
        : "All roadmap tasks are complete. Start job applications.",
      `Keep weekly learning hours near ${roadmap.learningHoursPerWeek} hours for predictable completion.`,
    ];
  }

  static recommendForRole(role: SupportedRoadmapRole, currentSkills: readonly string[]) {
    return RoadmapTemplateService.getMissingSkills(role, currentSkills).slice(0, 6);
  }
}
