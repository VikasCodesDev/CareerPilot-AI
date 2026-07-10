import { SECTION_CONTENT, WHY_ITEMS } from "@/features/landing/config/landing-content";
import {
  StaggerItem,
  StaggerReveal,
} from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";

export function WhySection() {
  return (
    <SectionShell id="why">
      <SectionHeader
        id="why"
        eyebrow={SECTION_CONTENT.why.eyebrow}
        title={SECTION_CONTENT.why.title}
        description={SECTION_CONTENT.why.description}
      />
      <StaggerReveal className="grid gap-8 md:grid-cols-3">
        {WHY_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <StaggerItem key={item.id}>
              <article className="text-center md:text-left">
                <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl gradient-primary md:mx-0">
                  <Icon className="size-7 text-primary-foreground" aria-hidden="true" />
                </div>
                <h3 className="text-h4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-pretty text-muted-foreground">
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
