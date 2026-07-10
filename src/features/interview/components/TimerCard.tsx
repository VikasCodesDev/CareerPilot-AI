"use client";

import { Timer } from "lucide-react";

import { useTimer } from "@/features/interview/hooks";
import { ProgressBar } from "./ProgressBar";

type TimerCardProps = {
  duration: number;
  running?: boolean;
};

export function TimerCard({ duration, running = false }: TimerCardProps) {
  const timer = useTimer(duration, running);

  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-3">
        <Timer className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Timer</h2>
      </div>
      <p className="mt-5 text-4xl font-semibold">{timer.remainingLabel}</p>
      <ProgressBar className="mt-5" value={timer.progress} label="Elapsed time" />
    </section>
  );
}
