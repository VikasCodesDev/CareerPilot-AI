import { ROADMAP_PHASES } from "@/features/roadmap/constants";
import type { Roadmap, RoadmapPhase } from "@/features/roadmap/types";

export function detectCurrentPhase(roadmap: Roadmap): RoadmapPhase {
  const firstOpenTask = roadmap.tasks.find((task) => task.status !== "completed");
  if (firstOpenTask) return firstOpenTask.phase;

  return ROADMAP_PHASES[ROADMAP_PHASES.length - 1];
}
