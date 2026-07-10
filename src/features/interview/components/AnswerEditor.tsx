"use client";

import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAnswer } from "@/features/interview/hooks";

type AnswerEditorProps = {
  disabled?: boolean;
};

export function AnswerEditor({ disabled = false }: AnswerEditorProps) {
  const { answer, setAnswer, wordCount, isReady } = useAnswer();

  return (
    <section className="surface-card p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Answer Editor</h2>
        <span className="text-xs text-muted-foreground">{wordCount} words</span>
      </div>
      <textarea
        className="mt-5 min-h-36 w-full resize-none rounded-2xl border border-border bg-background/50 p-4 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="Draft your answer here..."
        disabled={disabled}
        aria-label="Interview answer"
      />
      <div className="mt-4 flex justify-end">
        <Button disabled={!isReady || disabled}>
          Submit answer
          <Send className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
