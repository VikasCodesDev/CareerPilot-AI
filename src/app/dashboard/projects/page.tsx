import { FolderKanban, Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/features/auth/config/auth.config";
import { WidgetContainer } from "@/features/dashboard/components/content/widget-container";
import { WorkspaceHeader } from "@/features/dashboard/components/content/workspace-header";
import { PortfolioProjectCard } from "@/features/portfolio/components";
import type { PortfolioProject } from "@/features/portfolio/types";
import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import { connectToDatabase } from "@/lib/db";
import { AgentMemoryService } from "@/services";

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <ProjectsView authenticated={false} projects={[]} />;
  }

  await connectToDatabase();
  const [storedProjects, portfolio] = await Promise.all([
    AgentMemoryService.getProjectsByUser(session.user.id),
    portfolioFeatureRepository.findByUser(session.user.id),
  ]);
  const projects: PortfolioProject[] = [
    ...portfolio?.projects ?? [],
    ...storedProjects.map((project, index) => ({
      id: project._id,
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      highlights: project.featuresList,
      githubUrl: project.githubUrl,
      demoUrl: project.demoUrl,
      order: (portfolio?.projects.length ?? 0) + index,
    })),
  ];

  return <ProjectsView authenticated projects={projects} />;
}

function ProjectsView({
  authenticated,
  projects,
}: {
  authenticated: boolean;
  projects: PortfolioProject[];
}) {
  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <WorkspaceHeader
        title="Projects"
        description="Saved project work from your portfolio and roadmap-generated project records."
        breadcrumbs={[{ label: "Projects" }]}
        actions={
          <Link href="/dashboard/portfolio" className={buttonVariants({ className: "gap-2" })}>
            <Plus className="size-4" aria-hidden="true" />
            Manage Portfolio
          </Link>
        }
      />

      {!authenticated ? (
        <WidgetContainer title="Projects" description="Sign in to view saved project work.">
          <EmptyProjects message="Project records are account-scoped." />
        </WidgetContainer>
      ) : null}

      {authenticated ? (
        <WidgetContainer
          title="Saved Projects"
          description={`${projects.length} project records available`}
        >
          {projects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <PortfolioProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyProjects message="Add projects to your portfolio or generate roadmap project work to see them here." />
          )}
        </WidgetContainer>
      ) : null}
    </div>
  );
}

function EmptyProjects({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <FolderKanban className="size-10 text-primary" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-semibold">No projects found</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
