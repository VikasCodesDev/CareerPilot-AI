"use client";

import { Bell, Globe, Moon, Palette, Shield, User } from "lucide-react";
import { memo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { WidgetContainer } from "@/features/dashboard/components/content/widget-container";
import { WorkspaceHeader } from "@/features/dashboard/components/content/workspace-header";

function SettingsSectionComponent() {
  const [notifications, setNotifications] = useState({
    agentUpdates: true,
    weeklyDigest: true,
    interviewReminders: false,
  });

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <WorkspaceHeader
        title="Settings"
        description="Workspace preferences, notifications, privacy, and account configuration."
        breadcrumbs={[{ label: "Settings" }]}
        actions={
          <Button size="sm">Save changes</Button>
        }
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <WidgetContainer title="Profile" description="Your workspace identity">
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="settings-name">Full name</Label>
                <Input id="settings-name" defaultValue="Alex Rivera" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="settings-role">Target role</Label>
                <Input id="settings-role" defaultValue="Senior Product Designer" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-email">Email</Label>
              <Input id="settings-email" type="email" defaultValue="alex.rivera@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-bio">Professional summary</Label>
              <Input
                id="settings-bio"
                defaultValue="Design leader focused on AI-native product experiences."
              />
            </div>
          </form>
        </WidgetContainer>

        <WidgetContainer title="Workspace" description="Appearance and environment">
          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Moon className="size-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Dark workspace</p>
                  <p className="text-xs text-muted-foreground">Optimized for focus and depth</p>
                </div>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Palette className="size-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Aurora accents</p>
                  <p className="text-xs text-muted-foreground">Animated gradients and soft glow</p>
                </div>
              </div>
              <Badge variant="accent">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Globe className="size-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Locale</p>
                  <p className="text-xs text-muted-foreground">English (US)</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
          </div>
        </WidgetContainer>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <WidgetContainer title="Notifications" description="Control agent and workspace alerts">
          <div className="space-y-3">
            {[
              {
                key: "agentUpdates" as const,
                icon: Bell,
                title: "Agent updates",
                description: "Real-time alerts when agents complete tasks.",
              },
              {
                key: "weeklyDigest" as const,
                icon: User,
                title: "Weekly digest",
                description: "Summary of progress, scores, and recommendations.",
              },
              {
                key: "interviewReminders" as const,
                icon: Shield,
                title: "Interview reminders",
                description: "Nudges for scheduled practice sessions.",
              },
            ].map((item) => {
              const Icon = item.icon;
              const enabled = notifications[item.key];
              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Button
                    variant={enabled ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key],
                      }))
                    }
                  >
                    {enabled ? "On" : "Off"}
                  </Button>
                </div>
              );
            })}
          </div>
        </WidgetContainer>

        <WidgetContainer title="Data & Privacy" description="Storage usage and account controls">
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Workspace storage</span>
                <span className="font-semibold tabular-nums">68%</span>
              </div>
              <Progress value={68} />
              <p className="mt-2 text-xs text-muted-foreground">
                3.4 GB of 5 GB used across resumes, sessions, and portfolio assets.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-sm font-semibold">Data retention</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Agent memory and session history are retained for 12 months unless archived.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                Export data
              </Button>
              <Button variant="destructive" size="sm">
                Delete account
              </Button>
            </div>
          </div>
        </WidgetContainer>
      </section>
    </div>
  );
}

export const SettingsSection = memo(SettingsSectionComponent);
