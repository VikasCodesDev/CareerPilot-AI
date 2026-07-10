import { NextRequest, NextResponse } from "next/server";
import { logger } from "./logger";
import { ERROR_MESSAGES } from "@/constants";

// ---------------------------------------------------------------------------
// API Response Shapes
// ---------------------------------------------------------------------------
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
}

// ---------------------------------------------------------------------------
// Response Helpers
// ---------------------------------------------------------------------------
export function apiSuccess<T>(
  data: T,
  message?: string,
  status = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, data, message }, { status });
}

export function apiError(
  error: string = ERROR_MESSAGES.SERVER_ERROR,
  status = 500,
  code?: string
): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ success: false, error, code }, { status });
}

// ---------------------------------------------------------------------------
// Async Route Wrapper — Next.js 16 compatible signature
// ---------------------------------------------------------------------------
type RouteHandler = (req: NextRequest) => Promise<NextResponse>;

export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (req) => {
    try {
      return await handler(req);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : ERROR_MESSAGES.SERVER_ERROR;
      logger.error("Unhandled route error", { message, url: req.url });
      return apiError(message, 500);
    }
  };
}




// ---------------------------------------------------------------------------
// Pagination Helper
// ---------------------------------------------------------------------------
export interface ParsedPagination {
  page: number;
  limit: number;
}

export function parsePagination(url: string): ParsedPagination {
  const { searchParams } = new URL(url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));
  return { page, limit };
}

// ---------------------------------------------------------------------------
// ID Generator
// ---------------------------------------------------------------------------
export function generateId(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// ---------------------------------------------------------------------------
// Date Helpers
// ---------------------------------------------------------------------------
export function toISOString(date: Date | string): string {
  return new Date(date).toISOString();
}

export function daysBetween(a: Date, b: Date): number {
  const MS_PER_DAY = 86_400_000;
  return Math.floor(Math.abs(b.getTime() - a.getTime()) / MS_PER_DAY);
}
