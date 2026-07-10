import type { Portfolio } from "@/features/portfolio/types";
import { calculateReadingTime } from "./reading-time";

export function portfolioToMarkdown(portfolio: Portfolio): string {
  const sections = portfolio.sections
    .filter((section) => section.enabled)
    .map((section) => `## ${section.title}\n\n${section.content}`)
    .join("\n\n");

  return `# ${portfolio.title}\n\nReading time: ${calculateReadingTime(sections)} min\n\n${sections}`;
}
