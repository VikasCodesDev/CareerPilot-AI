import { INTERVIEW_DIFFICULTIES } from "@/features/interview/constants";
import type { InterviewDifficulty } from "@/features/interview/types";
import { cn } from "@/lib/utils";

type DifficultySelectorProps = {
  value: InterviewDifficulty | null;
};

export function DifficultySelector({ value }: DifficultySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Interview difficulty">
      {INTERVIEW_DIFFICULTIES.map((difficulty) => (
        <span
          key={difficulty}
          className={cn(
            "rounded-full border px-3 py-1 text-xs",
            value === difficulty
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-border bg-muted/20 text-muted-foreground"
          )}
        >
          {difficulty}
        </span>
      ))}
    </div>
  );
}
