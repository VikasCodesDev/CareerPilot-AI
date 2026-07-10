import { Roadmap, RoadmapDocument } from "@/models/Roadmap";
import type { Roadmap as CareerRoadmap } from "@/features/roadmap/types";

function toRoadmap(doc: RoadmapDocument): CareerRoadmap {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    careerGoal: doc.careerGoal,
    currentSkills: doc.currentSkills,
    targetRole: doc.targetRole,
    experienceLevel: doc.experienceLevel,
    roadmapLevel: doc.roadmapLevel,
    estimatedDuration: doc.estimatedDuration,
    currentPhase: doc.currentPhase,
    progress: doc.progress,
    completion: doc.completion,
    milestones: doc.milestones,
    tasks: doc.tasks,
    resources: doc.resources,
    deadlines: doc.deadlines,
    weeklyGoals: doc.weeklyGoals,
    monthlyGoals: doc.monthlyGoals,
    skillGraph: doc.skillGraph,
    learningHoursPerWeek: doc.learningHoursPerWeek,
    status: doc.status,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export class RoadmapFeatureRepository {
  async saveRoadmap(roadmap: Omit<CareerRoadmap, "id" | "createdAt" | "updatedAt">) {
    const created = await Roadmap.create({
      ...roadmap,
      estimatedMonths: Math.ceil(roadmap.estimatedDuration / 4),
      skillsToAcquire: roadmap.skillGraph.map((skill) => skill.label),
    });

    return toRoadmap(created);
  }

  async updateRoadmap(
    roadmapId: string,
    userId: string,
    data: Partial<Omit<CareerRoadmap, "id" | "userId" | "createdAt" | "updatedAt">>
  ) {
    const updated = await Roadmap.findOneAndUpdate(
      { _id: roadmapId, userId },
      { $set: data },
      { new: true, runValidators: true }
    ).exec();

    return updated ? toRoadmap(updated) : null;
  }

  async deleteRoadmap(roadmapId: string, userId: string) {
    const result = await Roadmap.deleteOne({ _id: roadmapId, userId }).exec();
    return result.deletedCount === 1;
  }

  async getRoadmap(roadmapId: string, userId: string) {
    const roadmap = await Roadmap.findOne({ _id: roadmapId, userId }).exec();
    return roadmap ? toRoadmap(roadmap) : null;
  }

  async getLatestRoadmap(userId: string) {
    const roadmap = await Roadmap.findOne({ userId, status: { $ne: "archived" } })
      .sort({ updatedAt: -1 })
      .exec();
    return roadmap ? toRoadmap(roadmap) : null;
  }

  async listRoadmaps(userId: string) {
    const roadmaps = await Roadmap.find({ userId }).sort({ updatedAt: -1 }).exec();
    return roadmaps.map(toRoadmap);
  }
}

export const roadmapFeatureRepository = new RoadmapFeatureRepository();
