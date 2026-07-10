import { env } from "@/config/env";

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
}

function formatLog(entry: LogEntry): string {
  const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
  const context = entry.context ? ` ${JSON.stringify(entry.context)}` : "";
  return `${prefix} ${entry.message}${context}`;
}

function log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
  const entry: LogEntry = {
    level,
    message,
    context,
    timestamp: new Date().toISOString(),
  };

  const formatted = formatLog(entry);

  if (env.NODE_ENV === "production") {
    // In production, only log warn/error to avoid verbosity
    if (level === "warn" || level === "error") {
      console[level](formatted);
    }
  } else {
    console[level === "debug" ? "log" : level](formatted);
  }
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => log("info", message, context),
  warn: (message: string, context?: Record<string, unknown>) => log("warn", message, context),
  error: (message: string, context?: Record<string, unknown>) => log("error", message, context),
  debug: (message: string, context?: Record<string, unknown>) => log("debug", message, context),
};
