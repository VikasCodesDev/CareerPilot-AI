"use client";

import { type LucideIcon } from "lucide-react";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import {
  DashboardContentGrid,
  DashboardGridItem,
} from "@/features/dashboard/components/content/dashboard-content-grid";
import { EmptyState } from "@/features/dashboard/components/content/empty-state";
import { WidgetContainer } from "@/features/dashboard/components/content/widget-container";
import { WorkspaceHeader } from "@/features/dashboard/components/content/workspace-header";
import type { DashboardSectionId } from "@/types/dashboard";
import { DASHBOARD_NAV_ITEMS } from "@/features/dashboard/config/dashboard-nav";

type SectionPlaceholderProps = {
  sectionId: DashboardSectionId;
  icon: LucideIcon;
  emptyTitle?: string;
  emptyDescription?: string;
  showWidgets?: boolean;
};

function SectionPlaceholderComponent({
  sectionId,
  icon: Icon,
  emptyTitle,
  emptyDescription,
  showWidgets = false,
}: SectionPlaceholderProps) {
  const navItem = DASHBOARD_NAV_ITEMS.find((item) => item.id === sectionId);

  if (!navItem) return null;

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <WorkspaceHeader
        title={navItem.label}
        description={navItem.description}
        breadcrumbs={[{ label: navItem.label }]}
      />

      {showWidgets ? (
        <DashboardContentGrid>
          <DashboardGridItem>
            <WidgetContainer title="Coming soon" description="Placeholder widget">
              <EmptyState
                icon={Icon}
                title={emptyTitle ?? `${navItem.label} workspace`}
                description={
                  emptyDescription ??
                  "This section is scaffolded and ready for Module 05+ implementation."
                }
                action={<Button variant="outline">Notify me</Button>}
              />
            </WidgetContainer>
          </DashboardGridItem>
        </DashboardContentGrid>
      ) : (
        <EmptyState
          icon={Icon}
          title={emptyTitle ?? `${navItem.label} coming soon`}
          description={
            emptyDescription ??
            "This section is scaffolded and ready for Module 05+ implementation."
          }
          action={<Button variant="outline">Get started</Button>}
        />
      )}
    </div>
  );
}

export const SectionPlaceholder = memo(SectionPlaceholderComponent);
