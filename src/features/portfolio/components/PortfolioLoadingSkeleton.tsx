export function PortfolioLoadingSkeleton() {
  return (
    <section className="surface-card space-y-4 p-6" role="status">
      <div className="h-6 w-52 animate-pulse rounded-full bg-muted" />
      <div className="h-40 animate-pulse rounded-2xl bg-muted/60" />
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="h-20 animate-pulse rounded-2xl bg-muted/60" />
        <div className="h-20 animate-pulse rounded-2xl bg-muted/60" />
        <div className="h-20 animate-pulse rounded-2xl bg-muted/60" />
      </div>
    </section>
  );
}
