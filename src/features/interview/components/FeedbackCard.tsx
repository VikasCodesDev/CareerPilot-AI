import { MessageSquareText } from "lucide-react";

import type { InterviewFeedback } from "@/features/interview/types";

type FeedbackCardProps = {
  feedback: InterviewFeedback | null;
};

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <MessageSquareText className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Latest Feedback</h2>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {feedback?.summary ?? "Submit an answer to generate deterministic feedback."}
      </p>
      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <FeedbackList title="Strengths" items={feedback?.strengths ?? []} />
        <FeedbackList title="Weaknesses" items={feedback?.weaknesses ?? []} />
        <FeedbackList title="Suggestions" items={feedback?.suggestions ?? []} />
      </div>
    </section>
  );
}

function FeedbackList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
        {items.length > 0 ? items.map((item) => <li key={item}>{item}</li>) : <li>No entries yet.</li>}
      </ul>
    </div>
  );
}
