import type { Roadmap, RoadmapMilestone, RoadmapProgress, RoadmapTask } from "@/features/roadmap/types";

export function calculateCompletion(tasks: readonly RoadmapTask[]): number {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter((task) => task.status === "completed").length;
  return Math.round((completed / tasks.length) * 100);
}

export function calculateProgress(
  tasks: readonly RoadmapTask[],
  milestones: readonly RoadmapMilestone[],
  learningHoursPerWeek: number
): RoadmapProgress {
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const completedMilestones = milestones.filter((milestone) => milestone.status === "completed");
  const totalPlannedHours = tasks.reduce((total, task) => total + task.estimatedHours, 0);
  const completedHours = completedTasks.reduce((total, task) => total + task.estimatedHours, 0);
  const completionPercentage = calculateCompletion(tasks);

  return {
    completionPercentage,
    completedTasks: completedTasks.length,
    totalTasks: tasks.length,
    completedMilestones: completedMilestones.length,
    totalMilestones: milestones.length,
    learningHoursCompleted: completedHours,
    learningHoursPlanned: totalPlannedHours || learningHoursPerWeek,
    currentWeek: Math.max(1, completedTasks.length + 1),
  };
}

export function recalculateRoadmapProgress(roadmap: Roadmap): Roadmap {
  const progress = calculateProgress(
    roadmap.tasks,
    roadmap.milestones,
    roadmap.learningHoursPerWeek
  );

  return {
    ...roadmap,
    progress,
    completion: progress.completionPercentage,
  };
}
