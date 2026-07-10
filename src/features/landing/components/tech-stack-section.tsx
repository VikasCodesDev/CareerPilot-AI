import { SECTION_CONTENT, TECH_STACK_ITEMS } from "@/features/landing/config/landing-content";
import {
  StaggerItem,
  StaggerReveal,
} from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";

export function TechStackSection() {
  return (
    <SectionShell id="tech-stack" variant="muted">
      <SectionHeader
        id="tech-stack"
        eyebrow={SECTION_CONTENT.techStack.eyebrow}
        title={SECTION_CONTENT.techStack.title}
        description={SECTION_CONTENT.techStack.description}
      />
      <StaggerReveal className="flex flex-wrap justify-center gap-3">
        {TECH_STACK_ITEMS.map((item) => (
          <StaggerItem key={item.id}>
            <div className="glass group flex flex-col items-center rounded-xl px-5 py-3 transition-colors hover:border-primary/30">
              <span className="font-semibold">{item.name}</span>
              <span className="text-xs text-muted-foreground">{item.category}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </SectionShell>
  );
}
