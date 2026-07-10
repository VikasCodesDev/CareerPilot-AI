export function generatePortfolioSlug(title: string, userId?: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const suffix = userId ? userId.slice(-6).toLowerCase().replace(/[^a-z0-9]/g, "") : "";
  return suffix ? `${base || "portfolio"}-${suffix}` : base || "portfolio";
}
