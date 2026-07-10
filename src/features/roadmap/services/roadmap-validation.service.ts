import {
  roadmapCreateSchema,
  roadmapDeleteSchema,
  roadmapProgressSchema,
  roadmapRecommendationSchema,
  roadmapUpdateSchema,
} from "@/features/roadmap/schemas";

export class RoadmapValidationService {
  static validateCreate(data: unknown) {
    return roadmapCreateSchema.safeParse(data);
  }

  static validateUpdate(data: unknown) {
    return roadmapUpdateSchema.safeParse(data);
  }

  static validateDelete(data: unknown) {
    return roadmapDeleteSchema.safeParse(data);
  }

  static validateProgress(data: unknown) {
    return roadmapProgressSchema.safeParse(data);
  }

  static validateRecommendations(data: unknown) {
    return roadmapRecommendationSchema.safeParse(data);
  }
}
