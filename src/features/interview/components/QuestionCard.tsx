import { HelpCircle } from "lucide-react";

import type { InterviewQuestion } from "@/features/interview/types";

type QuestionCardProps = {
  question: InterviewQuestion | null;
};

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="size-5 text-primary" aria-hidden="true" />
        <div>
          <h2 className="text-xl font-semibold">Current Question</h2>
          <p className="text-sm text-muted-foreground">{question?.category ?? "No question"}</p>
        </div>
      </div>
      <p className="mt-5 text-lg leading-8">
        {question?.prompt ?? "Start an interview session to receive deterministic questions."}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {(question?.expectedSignals ?? []).map((signal) => (
          <span key={signal} className="rounded-full border border-border bg-muted/20 px-3 py-1 text-xs">
            {signal}
          </span>
        ))}
      </div>
    </section>
  );
}
