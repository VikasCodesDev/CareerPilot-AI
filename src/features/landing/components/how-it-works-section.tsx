import { SECTION_CONTENT, TIMELINE_STEPS } from "@/features/landing/config/landing-content";
import { Reveal } from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";

export function HowItWorksSection() {
  return (
    <SectionShell id="how-it-works">
      <SectionHeader
        id="how-it-works"
        eyebrow={SECTION_CONTENT.howItWorks.eyebrow}
        title={SECTION_CONTENT.howItWorks.title}
        description={SECTION_CONTENT.howItWorks.description}
      />
      <div className="relative mx-auto max-w-2xl">
        <div
          className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent md:left-1/2 md:-translate-x-px"
          aria-hidden="true"
        />
        <ol className="space-y-12">
          {TIMELINE_STEPS.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.1}>
              <li className="relative flex gap-6 md:gap-0">
                <div
                  className={`flex flex-1 ${index % 2 === 0 ? "md:justify-end md:pr-12 md:text-right" : "md:justify-start md:pl-12 md:col-start-2"}`}
                >
                  <article className="ml-14 max-w-sm md:ml-0">
                    <span className="text-sm font-semibold text-primary">
                      Step {step.step}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {step.description}
                    </p>
                  </article>
                </div>
                <div
                  className="absolute left-3 flex size-7 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-bold text-primary md:left-1/2 md:-translate-x-1/2"
                  aria-hidden="true"
                >
                  {step.step}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
