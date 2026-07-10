import { cn } from "@/lib/utils";

type ProgressCircleProps = {
  value: number;
  label?: string;
  size?: "sm" | "lg";
};

export function ProgressCircle({ value, label = "Complete", size = "lg" }: ProgressCircleProps) {
  const normalized = Math.min(100, Math.max(0, Math.round(value)));
  const radius = size === "lg" ? 58 : 42;
  const stroke = size === "lg" ? 10 : 8;
  const viewBox = radius * 2 + stroke * 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalized / 100) * circumference;

  return (
    <div
      className={cn(
        "relative grid place-items-center",
        size === "lg" ? "size-40" : "size-28"
      )}
      aria-label={`${normalized}% ${label}`}
      role="img"
    >
      <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${viewBox} ${viewBox}`}>
        <circle
          cx={viewBox / 2}
          cy={viewBox / 2}
          r={radius}
          fill="none"
          stroke="rgb(255 255 255 / 0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={viewBox / 2}
          cy={viewBox / 2}
          r={radius}
          fill="none"
          stroke="url(#roadmap-progress)"
          strokeLinecap="round"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="roadmap-progress" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#7c3aed" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <span className={cn("font-semibold", size === "lg" ? "text-4xl" : "text-2xl")}>
          {normalized}%
        </span>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
