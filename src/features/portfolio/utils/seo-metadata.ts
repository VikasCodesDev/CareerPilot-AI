import type { PortfolioSEO } from "@/features/portfolio/types";

export function generateSeoMetadata(input: {
  title: string;
  summary?: string;
  skills?: string[];
  slug: string;
}): PortfolioSEO {
  const keywords = [...new Set([input.title, ...(input.skills ?? [])])].slice(0, 12);
  const description =
    input.summary?.slice(0, 155) ??
    `Professional portfolio for ${input.title}, including projects, skills, and career highlights.`;
  const score = Math.min(
    100,
    35 + (description.length >= 80 ? 25 : 10) + (keywords.length >= 5 ? 25 : keywords.length * 4)
  );

  return {
    title: input.title,
    description,
    keywords,
    canonicalUrl: `/portfolio/${input.slug}`,
    score,
  };
}
