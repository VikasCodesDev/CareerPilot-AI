import { Award, CheckCircle2 } from "lucide-react";

import { IBM_CONTENT, SECTION_CONTENT } from "@/features/landing/config/landing-content";
import { Reveal } from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";

export function IbmSkillsBuildSection() {
  return (
    <SectionShell id="ibm-skillsbuild">
      <Reveal>
        <div className="glass mx-auto max-w-4xl overflow-hidden rounded-2xl p-8 md:p-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-[#0f62fe]/10">
              <Award className="size-10 text-[#0f62fe]" aria-hidden="true" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="mb-2 text-sm font-medium tracking-wide text-[#0f62fe] uppercase">
                {SECTION_CONTENT.ibm.eyebrow}
              </p>
              <h2
                id="ibm-skillsbuild-heading"
                className="text-h3 text-2xl font-bold"
              >
                {IBM_CONTENT.badge}
              </h2>
              <p className="mt-2 text-lg font-semibold">{IBM_CONTENT.title}</p>
              <p className="mt-3 text-pretty text-muted-foreground">
                {IBM_CONTENT.description}
              </p>
              <ul className="mt-6 space-y-3">
                {IBM_CONTENT.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-3 text-sm"
                  >
                    <CheckCircle2
                      className="size-4 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
