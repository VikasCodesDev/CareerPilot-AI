import { z } from "zod";

import { PORTFOLIO_SECTION_TYPES, PORTFOLIO_THEMES } from "@/features/portfolio/constants";

const sectionTypeSchema = z.enum(PORTFOLIO_SECTION_TYPES);
const themeSchema = z.enum(PORTFOLIO_THEMES);
const urlSchema = z.string().url().optional().or(z.literal(""));

export const portfolioSectionSchema = z.object({
  id: z.string().min(1).optional(),
  type: sectionTypeSchema,
  title: z.string().min(1).max(80),
  content: z.string().min(1).max(6000),
  order: z.coerce.number().int().min(0),
  enabled: z.boolean().default(true),
});

export const portfolioProjectSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(1000),
  techStack: z.array(z.string().min(1)).max(20).default([]),
  highlights: z.array(z.string().min(1)).max(10).default([]),
  githubUrl: urlSchema,
  demoUrl: urlSchema,
  order: z.coerce.number().int().min(0).default(0),
});

export const portfolioCreateSchema = z.object({
  title: z.string().min(2).max(120),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/).optional(),
  targetRole: z.string().max(80).optional(),
  summary: z.string().max(1000).optional(),
  skills: z.array(z.string().min(1)).max(60).default([]),
  projects: z.array(portfolioProjectSchema).max(20).default([]),
  resumeUrl: urlSchema,
});

export const portfolioUpdateSchema = z.object({
  portfolioId: z.string().min(1),
  title: z.string().min(2).max(120).optional(),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/).optional(),
  visibility: z.enum(["private", "unlisted", "public"]).optional(),
  sections: z.array(portfolioSectionSchema).optional(),
  projects: z.array(portfolioProjectSchema).optional(),
  skills: z
    .array(
      z.object({
        id: z.string().min(1).optional(),
        name: z.string().min(1),
        category: z.string().min(1).default("General"),
        level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).default("Intermediate"),
        order: z.coerce.number().int().min(0).default(0),
      })
    )
    .optional(),
  seo: z
    .object({
      title: z.string().min(2).max(120),
      description: z.string().min(20).max(180),
      keywords: z.array(z.string().min(1)).max(20),
      canonicalUrl: z.string().optional(),
      score: z.coerce.number().int().min(0).max(100),
    })
    .optional(),
  settings: z
    .object({
      contactEmail: z.string().email().optional(),
      location: z.string().max(120).optional(),
      resumeUrl: urlSchema,
      socialLinks: z
        .array(z.object({ label: z.string().min(1), url: z.string().url() }))
        .max(12)
        .default([]),
    })
    .optional(),
});

export const portfolioIdSchema = z.object({
  portfolioId: z.string().min(1),
});

export const portfolioPublicQuerySchema = z.object({
  slug: z.string().min(1),
});

export const portfolioThemeSchema = z.object({
  portfolioId: z.string().min(1),
  theme: themeSchema,
});
