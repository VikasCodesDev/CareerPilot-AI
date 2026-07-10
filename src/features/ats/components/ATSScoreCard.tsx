"use client";

import { memo } from "react";
import { motion } from "framer-motion";

import { ProgressBar } from "@/features/ats/components/ProgressBar";

type ATSScoreCardProps = {
  title: string;
  score: number;
  description?: string;
};

function ATSScoreCardComponent({ title, score, description }: ATSScoreCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface-card p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <span className="text-2xl font-semibold">{score}</span>
      </div>
      <ProgressBar value={score} className="mt-4" />
    </motion.article>
  );
}

export const ATSScoreCard = memo(ATSScoreCardComponent);
