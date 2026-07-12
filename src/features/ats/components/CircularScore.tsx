"use client";

import { memo } from "react";

type CircularScoreProps = {
  score: number;
  label?: string;
  size?: number;
};

function CircularScoreComponent({ score, label = "ATS Score", size = 156 }: CircularScoreProps) {
  const safeScore = Math.max(0, Math.min(100, score));
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safeScore / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="pointer-events-none absolute inset-4 rounded-full bg-primary/10 blur-xl"
        aria-hidden="true"
      />
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ats-score-gradient)"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
        />
        <defs>
          <linearGradient id="ats-score-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold tabular-nums">{safeScore}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

export const CircularScore = memo(CircularScoreComponent);
