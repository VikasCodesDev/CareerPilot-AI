import { PROBLEM_ITEMS, SECTION_CONTENT } from "@/features/landing/config/landing-content";
import {
  Reveal,
  StaggerItem,
  StaggerReveal,
} from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";

export function ProblemSection() {
  return (
    <SectionShell id="problem" variant="muted">
      <SectionHeader
        id="problem"
        eyebrow={SECTION_CONTENT.problem.eyebrow}
        title={SECTION_CONTENT.problem.title}
        description={SECTION_CONTENT.problem.description}
      />
      <StaggerReveal className="grid gap-6 md:grid-cols-3">
        {PROBLEM_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <StaggerItem key={item.id}>
              <article className="surface-card group h-full p-6 transition-shadow hover:shadow-glow">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive transition-transform group-hover:scale-105">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="text-h4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerReveal>
    </SectionShell>
  );
}
