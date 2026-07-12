import { PHASE_TASK_TYPES, ROADMAP_PHASES } from "@/features/roadmap/constants";
import { RoadmapTemplateService } from "@/features/roadmap/services/roadmap-template.service";
import { RoadmapTimelineService } from "@/features/roadmap/services/roadmap-timeline.service";
import type {
  Roadmap,
  RoadmapGenerationInput,
  RoadmapLevel,
  RoadmapMilestone,
  RoadmapResource,
  RoadmapTask,
  SkillNode,
} from "@/features/roadmap/types";
import { generateId } from "@/lib/utils/api";
import { calculateProgress } from "@/features/roadmap/utils/progress";
import { getPhaseForWeek } from "@/features/roadmap/utils/timeline";

function getRoadmapLevel(input: RoadmapGenerationInput): RoadmapLevel {
  if (input.experienceLevel === "advanced") return "job-ready";
  if (input.experienceLevel === "intermediate") return "growth";
  return "starter";
}

export class RoadmapGeneratorService {
  static generate(input: RoadmapGenerationInput): Omit<Roadmap, "id" | "createdAt" | "updatedAt"> {
    const targetSkills = RoadmapTemplateService.getSkillsForRole(input.targetRole);
    const missingSkills = RoadmapTemplateService.getMissingSkills(
      input.targetRole,
      input.currentSkills
    );
    const skillGraph = this.createSkillGraph(targetSkills, missingSkills, input.timelineWeeks);
    const tasks = this.createTasks(input, targetSkills);
    const milestones = this.createMilestones(input.timelineWeeks, tasks);
    const resources = this.createResources(input.targetRole);
    const weeklyGoals = RoadmapTimelineService.createWeeklyGoals(
      tasks,
      input.timelineWeeks,
      input.learningHoursPerWeek
    );
    const monthlyGoals = RoadmapTimelineService.createMonthlyGoals(milestones, input.timelineWeeks);
    const deadlines = RoadmapTimelineService.createDeadlines(milestones);
    const progress = calculateProgress(tasks, milestones, input.learningHoursPerWeek);

    return {
      userId: input.userId,
      careerGoal: input.careerGoal,
      currentSkills: input.currentSkills,
      targetRole: input.targetRole,
      experienceLevel: input.experienceLevel,
      roadmapLevel: getRoadmapLevel(input),
      estimatedDuration: input.timelineWeeks,
      currentPhase: "Foundation",
      progress,
      completion: progress.completionPercentage,
      milestones,
      tasks,
      resources,
      deadlines,
      weeklyGoals,
      monthlyGoals,
      skillGraph,
      learningHoursPerWeek: input.learningHoursPerWeek,
      status: "active",
    };
  }

  private static createSkillGraph(
    targetSkills: readonly string[],
    missingSkills: readonly string[],
    timelineWeeks: number
  ): SkillNode[] {
    return targetSkills.map((skill, index) => {
      const phase = getPhaseForWeek(index + 1, Math.max(targetSkills.length, timelineWeeks));
      const previous = targetSkills[index - 1];

      return {
        id: `skill-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        label: skill,
        category: missingSkills.includes(skill) ? "Gap" : "Existing",
        phase,
        completed: !missingSkills.includes(skill),
        dependencies: previous ? [`skill-${previous.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`] : [],
      };
    });
  }

  private static createTasks(input: RoadmapGenerationInput, targetSkills: readonly string[]): RoadmapTask[] {
    return Array.from({ length: input.timelineWeeks }, (_, index) => {
      const week = index + 1;
      const phase = getPhaseForWeek(week, input.timelineWeeks);
      const taskTypes = PHASE_TASK_TYPES[phase];
      const skill = targetSkills[index % targetSkills.length] ?? input.targetRole;
      const taskType = taskTypes[index % taskTypes.length];

      return {
        id: generateId(`task-w${week}`),
        title: `${taskType}: ${skill}`,
        description: `Complete deterministic ${taskType.toLowerCase()} work for ${skill} as part of the ${phase} phase.`,
        type: taskType,
        phase,
        week,
        estimatedHours: Math.max(1, Math.round(input.learningHoursPerWeek / 2)),
        status: week === 1 ? "in-progress" : "pending",
        skillTags: [skill, input.targetRole],
      };
    });
  }

  private static createMilestones(timelineWeeks: number, tasks: readonly RoadmapTask[]): RoadmapMilestone[] {
    return ROADMAP_PHASES.map((phase, index) => {
      const week = Math.min(timelineWeeks, Math.max(1, Math.ceil(((index + 1) / ROADMAP_PHASES.length) * timelineWeeks)));
      const phaseTasks = tasks.filter((task) => task.phase === phase);

      return {
        id: generateId(`milestone-${index + 1}`),
        title: `${phase} complete`,
        description: `Finish the ${phase.toLowerCase()} outcomes and unlock the next roadmap stage.`,
        phase,
        week,
        status: "pending",
        taskIds: phaseTasks.map((task) => task.id),
      };
    });
  }

  private static createResources(targetRole: string): RoadmapResource[] {
    return ROADMAP_PHASES.map((phase, index) => {
      const type =
        phase === "Foundation"
          ? "Documentation"
          : phase === "Intermediate"
          ? "Practice"
          : phase === "Projects"
          ? "Project"
          : phase === "Interview Preparation"
          ? "Practice"
          : "Reading";

      const descriptions = {
        Foundation: `Study core ${targetRole} concepts with curated tutorials, articles, and introductory exercises.`,
        Intermediate: `Build deeper ${targetRole} skills through guided practice, coding challenges, and intermediate projects.`,
        Projects: `Complete project-based work that demonstrates practical ${targetRole} ability and portfolio-ready outcomes.`,
        "Advanced": `Refine advanced ${targetRole} techniques with real-world architecture and optimization exercises.`,
        "Interview Preparation": `Practice role-specific interview questions, STAR frameworks, and speaking points for ${targetRole} interviews.`,
        Portfolio: `Document your best ${targetRole} work using portfolio copy, project summaries, and showcase assets.`,
        "Job Applications": `Prepare application materials, craft targeted resumes, and practice follow-ups for ${targetRole} opportunities.`,
      } as const;

      return {
        id: generateId(`resource-${index + 1}`),
        title: `${phase} resources for ${targetRole}`,
        type,
        phase,
        description: descriptions[phase],
      };
    });
  }
}
