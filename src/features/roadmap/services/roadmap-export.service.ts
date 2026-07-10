import type { Roadmap } from "@/features/roadmap/types";

export class RoadmapExportService {
  static toJson(roadmap: Roadmap): string {
    return JSON.stringify(roadmap, null, 2);
  }

  static toMarkdown(roadmap: Roadmap): string {
    const milestones = roadmap.milestones
      .map((milestone) => `- Week ${milestone.week}: ${milestone.title}`)
      .join("\n");

    return `# ${roadmap.careerGoal}\n\nTarget role: ${roadmap.targetRole}\nCompletion: ${roadmap.completion}%\n\n## Milestones\n${milestones}`;
  }
}
