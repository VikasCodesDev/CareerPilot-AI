"use client";

import { motion } from "framer-motion";
import { LockKeyhole, Rocket } from "lucide-react";

import { PortfolioAchievementCard } from "@/features/portfolio/components/PortfolioAchievementCard";
import { PortfolioAnalyticsCard } from "@/features/portfolio/components/PortfolioAnalyticsCard";
import { PortfolioBuilder } from "@/features/portfolio/components/PortfolioBuilder";
import { PortfolioCertificationCard } from "@/features/portfolio/components/PortfolioCertificationCard";
import { PortfolioContactCard } from "@/features/portfolio/components/PortfolioContactCard";
import { PortfolioEducationCard } from "@/features/portfolio/components/PortfolioEducationCard";
import { PortfolioExperienceCard } from "@/features/portfolio/components/PortfolioExperienceCard";
import { PortfolioInsights } from "@/features/portfolio/components/PortfolioInsights";
import { PortfolioPreview } from "@/features/portfolio/components/PortfolioPreview";
import { PortfolioProjectCard } from "@/features/portfolio/components/PortfolioProjectCard";
import { PortfolioPublishCard } from "@/features/portfolio/components/PortfolioPublishCard";
import { PortfolioSEOCard } from "@/features/portfolio/components/PortfolioSEOCard";
import { PortfolioShareCard } from "@/features/portfolio/components/PortfolioShareCard";
import { PortfolioSkillCard } from "@/features/portfolio/components/PortfolioSkillCard";
import { PortfolioSocialLinks } from "@/features/portfolio/components/PortfolioSocialLinks";
import { PortfolioVersionHistory } from "@/features/portfolio/components/PortfolioVersionHistory";
import { PortfolioVisibilityCard } from "@/features/portfolio/components/PortfolioVisibilityCard";
import { usePortfolio } from "@/features/portfolio/hooks";
import type { Portfolio, PortfolioTemplate } from "@/features/portfolio/types";

type PortfolioDashboardProps = {
  portfolio: Portfolio | null;
  templates: PortfolioTemplate[];
  authenticated: boolean;
};

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

export function PortfolioDashboard({ portfolio, templates, authenticated }: PortfolioDashboardProps) {
  const { completion, primaryProjects, primarySkills } = usePortfolio(portfolio);

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <motion.header
        {...fadeIn}
        className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-xl sm:p-8"
      >
        <div className="absolute inset-0 -z-10 aurora-bg opacity-60" aria-hidden="true" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium text-primary">
              <Rocket className="size-3.5" aria-hidden="true" />
              Portfolio Builder & Personal Branding
            </div>
            <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">
              {portfolio?.title ?? "Portfolio Dashboard"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Build a professional portfolio from your profile, resume, projects, skills, achievements, and brand settings.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background/50 p-4">
            <p className="text-3xl font-semibold">{completion}%</p>
            <p className="text-sm text-muted-foreground">Profile completion</p>
          </div>
        </div>
      </motion.header>

      {!authenticated ? (
        <PortfolioEmptyState
          title="Sign in to manage your portfolio."
          description="Portfolio data is account-scoped and stays private until you publish it."
        />
      ) : null}

      {authenticated && !portfolio ? (
        <PortfolioEmptyState
          title="No portfolio created yet."
          description="Use the portfolio create API to generate your deterministic personal branding foundation."
        />
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <PortfolioPreview portfolio={portfolio} />
          <PortfolioBuilder portfolio={portfolio} templates={templates} />
          <section className="surface-card p-6">
            <h2 className="text-xl font-semibold">Projects</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {primaryProjects.length > 0 ? (
                primaryProjects.map((project) => <PortfolioProjectCard key={project.id} project={project} />)
              ) : (
                <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                  No projects imported yet.
                </p>
              )}
            </div>
          </section>
          <section className="surface-card p-6">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {primarySkills.length > 0 ? (
                primarySkills.map((skill) => <PortfolioSkillCard key={skill.id} skill={skill} />)
              ) : (
                <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground sm:col-span-2 lg:col-span-4">
                  No skills imported yet.
                </p>
              )}
            </div>
          </section>
          <PortfolioDetailGrid portfolio={portfolio} />
        </div>
        <aside className="space-y-6">
          <PortfolioPublishCard portfolio={portfolio} />
          <PortfolioVisibilityCard portfolio={portfolio} />
          <PortfolioSEOCard seo={portfolio?.seo ?? null} />
          <PortfolioAnalyticsCard analytics={portfolio?.analytics ?? null} />
          <PortfolioInsights completion={completion} seoScore={portfolio?.seo.score ?? 0} />
          <PortfolioContactCard settings={portfolio?.settings ?? null} />
          <PortfolioSocialLinks settings={portfolio?.settings ?? null} />
          <PortfolioShareCard portfolio={portfolio} />
          <PortfolioVersionHistory versions={portfolio?.versions ?? []} />
        </aside>
      </section>
    </div>
  );
}

function PortfolioEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <section className="surface-card flex flex-col items-center justify-center px-6 py-14 text-center">
      <LockKeyhole className="size-10 text-primary" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
    </section>
  );
}

function PortfolioDetailGrid({ portfolio }: { portfolio: Portfolio | null }) {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {(portfolio?.experience ?? []).map((experience) => (
        <PortfolioExperienceCard key={experience.id} experience={experience} />
      ))}
      {(portfolio?.education ?? []).map((education) => (
        <PortfolioEducationCard key={education.id} education={education} />
      ))}
      {(portfolio?.certifications ?? []).map((certification) => (
        <PortfolioCertificationCard key={certification.id} certification={certification} />
      ))}
      {(portfolio?.achievements ?? []).map((achievement) => (
        <PortfolioAchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </section>
  );
}
