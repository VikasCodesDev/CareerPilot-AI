import { FolderGit2 } from "lucide-react";

import type { PortfolioProject } from "@/features/portfolio/types";

type PortfolioProjectCardProps = {
  project: PortfolioProject;
};

export function PortfolioProjectCard({ project }: PortfolioProjectCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-muted/20 p-4">
      <FolderGit2 className="size-5 text-primary" aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold">{project.title}</h3>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.techStack.slice(0, 5).map((tech) => (
          <span key={tech} className="rounded-full bg-background/50 px-2 py-0.5 text-[11px] text-muted-foreground">
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
