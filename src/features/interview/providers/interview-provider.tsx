"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { InterviewHistoryItem, InterviewSession } from "@/features/interview/types";

type InterviewContextValue = {
  session: InterviewSession | null;
  history: InterviewHistoryItem[];
  authenticated: boolean;
};

const InterviewContext = createContext<InterviewContextValue | null>(null);

export function InterviewProvider({
  children,
  session,
  history,
  authenticated,
}: InterviewContextValue & { children: ReactNode }) {
  const value = useMemo(
    () => ({ session, history, authenticated }),
    [authenticated, history, session]
  );

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>;
}

export function useInterviewContext() {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterviewContext must be used within InterviewProvider.");
  }

  return context;
}
