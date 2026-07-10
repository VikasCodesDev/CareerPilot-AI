import type { InterviewHistoryItem } from "@/features/interview/types";

type HistoryCardProps = {
  item: InterviewHistoryItem;
};

export function HistoryCard({ item }: HistoryCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-muted/20 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold">{item.targetRole}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {item.interviewType} - {item.difficulty}
          </p>
        </div>
        <span className="text-2xl font-semibold">{item.score}</span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {item.completedQuestions}/{item.totalQuestions} questions - {item.status}
      </p>
    </article>
  );
}
