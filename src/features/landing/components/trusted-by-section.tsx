import { SECTION_CONTENT, TRUSTED_BY_LOGOS } from "@/features/landing/config/landing-content";
import { Reveal } from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";

export function TrustedBySection() {
  return (
    <SectionShell id="trusted-by" className="py-12 md:py-16">
      <SectionHeader
        id="trusted-by"
        eyebrow={SECTION_CONTENT.trustedBy.eyebrow}
        title={SECTION_CONTENT.trustedBy.title}
      />
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {TRUSTED_BY_LOGOS.map((logo, index) => (
          <Reveal key={logo.id} delay={index * 0.05}>
            <div className="text-lg font-semibold tracking-tight text-muted-foreground/60 transition-colors hover:text-muted-foreground">
              {logo.name}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
