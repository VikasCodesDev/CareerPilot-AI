import { MicOff } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="surface-card flex flex-col items-center justify-center px-6 py-14 text-center">
      <MicOff className="size-10 text-primary" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
    </section>
  );
}
