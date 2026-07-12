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
        <div className={cn("mb-4 inline-flex items-center gap-2", align === "center" && "justify-center w-full")}>
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-primary/50" aria-hidden="true" />
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            {eyebrow}
          </p>
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-primary/50" aria-hidden="true" />
        </div>
      ) : null}
      <h2
        id={`${id}-heading`}
        className="text-h2 text-balance font-extrabold tracking-tight text-white"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-body text-pretty text-zinc-400 leading-relaxed">
          {description}
        </p>
      ) : null}
    </header>
  );
}
