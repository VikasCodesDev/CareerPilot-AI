"use client";

import { useMemo, useState } from "react";

import { countWords, formatAnswer } from "@/features/interview/utils/answer-formatter";

export function useAnswer(initialValue = "") {
  const [answer, setAnswer] = useState(initialValue);

  const metadata = useMemo(() => {
    const formattedAnswer = formatAnswer(answer);

    return {
      answer,
      setAnswer,
      formattedAnswer,
      wordCount: countWords(answer),
      isReady: formattedAnswer.length >= 3,
    };
  }, [answer]);

  return metadata;
}
