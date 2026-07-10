import type { Roadmap, RoadmapProgressUpdate } from "@/features/roadmap/types";
import { detectCurrentPhase } from "@/features/roadmap/utils/phase";
import { recalculateRoadmapProgress } from "@/features/roadmap/utils/progress";

export class RoadmapProgressService {
  static applyProgressUpdate(roadmap: Roadmap, update: RoadmapProgressUpdate): Roadmap {
    const tasks = roadmap.tasks.map((task) =>
      update.taskId === task.id ? { ...task, status: update.status } : task
    );
    const milestones = roadmap.milestones.map((milestone) =>
      update.milestoneId === milestone.id ? { ...milestone, status: update.status } : milestone
    );
    const recalculated = recalculateRoadmapProgress({ ...roadmap, tasks, milestones });

    return {
      ...recalculated,
      currentPhase: detectCurrentPhase(recalculated),
      status: recalculated.completion === 100 ? "completed" : recalculated.status,
    };
  }
}
