"use client";

import { useEffect, useMemo, useState } from "react";

import { formatTimer, minutesToSeconds } from "@/features/interview/utils/timer";

export function useTimer(durationMinutes: number, running = false) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const durationSeconds = minutesToSeconds(durationMinutes);

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      setElapsedSeconds((value) => Math.min(durationSeconds, value + 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [durationSeconds, running]);

  return useMemo(
    () => ({
      elapsedSeconds,
      remainingSeconds: Math.max(0, durationSeconds - elapsedSeconds),
      elapsedLabel: formatTimer(elapsedSeconds),
      remainingLabel: formatTimer(Math.max(0, durationSeconds - elapsedSeconds)),
      progress: durationSeconds > 0 ? Math.round((elapsedSeconds / durationSeconds) * 100) : 0,
    }),
    [durationSeconds, elapsedSeconds]
  );
}
