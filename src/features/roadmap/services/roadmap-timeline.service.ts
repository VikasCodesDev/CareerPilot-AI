import { ROADMAP_PHASES } from "@/features/roadmap/constants";
import { roadmapConfig } from "@/features/roadmap/config";
import type { MonthlyGoal, RoadmapDeadline, RoadmapMilestone, RoadmapTask, WeeklyGoal } from "@/features/roadmap/types";
import { calculateEstimatedDate, getPhaseForWeek } from "@/features/roadmap/utils/timeline";

export class RoadmapTimelineService {
  static createWeeklyGoals(tasks: readonly RoadmapTask[], timelineWeeks: number, hoursPerWeek: number): WeeklyGoal[] {
    return Array.from({ length: timelineWeeks }, (_, index) => {
      const week = index + 1;
      const weekTasks = tasks.filter((task) => task.week === week);
      const phase = getPhaseForWeek(week, timelineWeeks);

      return {
        week,
        title: `Week ${week}: ${phase}`,
        focus: weekTasks[0]?.skillTags[0] ?? phase,
        taskIds: weekTasks.map((task) => task.id),
        targetHours: hoursPerWeek,
        completedHours: 0,
      };
    });
  }

  static createMonthlyGoals(milestones: readonly RoadmapMilestone[], timelineWeeks: number): MonthlyGoal[] {
    const months = Math.ceil(timelineWeeks / roadmapConfig.weeksPerMonth);

    return Array.from({ length: months }, (_, index) => {
      const month = index + 1;
      const startWeek = index * roadmapConfig.weeksPerMonth + 1;
      const endWeek = Math.min(timelineWeeks, startWeek + roadmapConfig.weeksPerMonth - 1);
      const monthMilestones = milestones.filter(
        (milestone) => milestone.week >= startWeek && milestone.week <= endWeek
      );

      return {
        month,
        title: `Month ${month} outcomes`,
        focus: monthMilestones[0]?.phase ?? ROADMAP_PHASES[Math.min(index, ROADMAP_PHASES.length - 1)],
        milestoneIds: monthMilestones.map((milestone) => milestone.id),
        completionTarget: Math.round((endWeek / timelineWeeks) * 100),
      };
    });
  }

  static createDeadlines(milestones: readonly RoadmapMilestone[]): RoadmapDeadline[] {
    return milestones.map((milestone) => ({
      id: `deadline-${milestone.id}`,
      title: `${milestone.title} checkpoint`,
      week: milestone.week,
      phase: milestone.phase,
      dueDate: calculateEstimatedDate(milestone.week),
    }));
  }
}
