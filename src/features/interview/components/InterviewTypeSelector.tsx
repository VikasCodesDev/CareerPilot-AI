import { INTERVIEW_TYPES } from "@/features/interview/constants";
import type { InterviewType } from "@/features/interview/types";
import { cn } from "@/lib/utils";

type InterviewTypeSelectorProps = {
  value: InterviewType | null;
};

export function InterviewTypeSelector({ value }: InterviewTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Interview type">
      {INTERVIEW_TYPES.map((type) => (
        <span
          key={type}
          className={cn(
            "rounded-full border px-3 py-1 text-xs",
            value === type
              ? "border-secondary/40 bg-secondary/10 text-secondary"
              : "border-border bg-muted/20 text-muted-foreground"
          )}
        >
          {type}
        </span>
      ))}
    </div>
  );
}
