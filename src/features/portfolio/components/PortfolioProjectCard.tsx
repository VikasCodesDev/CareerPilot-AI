import { FolderGit2 } from "lucide-react";

import type { PortfolioProject } from "@/features/portfolio/types";

type PortfolioProjectCardProps = {
  project: PortfolioProject;
};

export function PortfolioProjectCard({ project }: PortfolioProjectCardProps) {
  return (
    <article className="workspace-card p-4 transition-colors hover:border-primary/20">
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <FolderGit2 className="size-4" aria-hidden="true" />
      </div>
      <h3 className="mt-3 text-sm font-semibold">{project.title}</h3>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.techStack.slice(0, 5).map((tech) => (
          <span key={tech} className="workspace-chip text-[11px]">
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
