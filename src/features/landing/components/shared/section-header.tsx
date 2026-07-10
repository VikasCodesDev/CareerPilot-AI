import { cn } from "@/lib/utils";

type SectionHeaderProps = Readonly<{
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}>;

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-3xl text-center",
        align === "left" && "max-w-2xl text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium tracking-wide text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={`${id}-heading`}
        className="text-h2 text-balance font-bold tracking-tight"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-body text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
