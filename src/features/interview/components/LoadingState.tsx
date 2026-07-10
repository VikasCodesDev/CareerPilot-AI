export function LoadingState() {
  return (
    <section className="surface-card space-y-4 p-6" role="status">
      <div className="h-5 w-48 animate-pulse rounded-full bg-muted" />
      <div className="h-28 animate-pulse rounded-2xl bg-muted/60" />
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="h-16 animate-pulse rounded-2xl bg-muted/60" />
        <div className="h-16 animate-pulse rounded-2xl bg-muted/60" />
        <div className="h-16 animate-pulse rounded-2xl bg-muted/60" />
      </div>
    </section>
  );
}
