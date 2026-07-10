import { GitBranch } from "lucide-react";

import type { SkillNode } from "@/features/roadmap/types";
import { cn } from "@/lib/utils";

type SkillTreeProps = {
  skills: SkillNode[];
};

export function SkillTree({ skills }: SkillTreeProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <GitBranch className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Skill Graph</h2>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span
              key={skill.id}
              className={cn(
                "rounded-full border px-3 py-1 text-xs",
                skill.completed
                  ? "border-success/30 bg-success/10 text-success"
                  : "border-border bg-muted/20 text-muted-foreground"
              )}
            >
              {skill.label}
            </span>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No skill graph generated yet.</p>
        )}
      </div>
    </section>
  );
}
