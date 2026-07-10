import { ROADMAP_PHASES } from "@/features/roadmap/constants";
import type { RoadmapPhase } from "@/features/roadmap/types";

export function getPhaseForWeek(week: number, totalWeeks: number): RoadmapPhase {
  const phaseIndex = Math.min(
    ROADMAP_PHASES.length - 1,
    Math.floor(((week - 1) / Math.max(totalWeeks, 1)) * ROADMAP_PHASES.length)
  );

  return ROADMAP_PHASES[phaseIndex];
}

export function calculatePhaseWeekRange(phase: RoadmapPhase, totalWeeks: number) {
  const index = ROADMAP_PHASES.indexOf(phase);
  const weeksPerPhase = Math.max(1, Math.ceil(totalWeeks / ROADMAP_PHASES.length));
  const startWeek = index * weeksPerPhase + 1;
  const endWeek = Math.min(totalWeeks, startWeek + weeksPerPhase - 1);

  return { startWeek, endWeek };
}

export function calculateEstimatedDate(week: number): string {
  const date = new Date();
  date.setDate(date.getDate() + week * 7);
  return date.toISOString();
}
