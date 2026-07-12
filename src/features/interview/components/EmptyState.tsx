import { MicOff } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="workspace-card flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
        <MicOff className="size-8 text-primary" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
    </section>
  );
}
