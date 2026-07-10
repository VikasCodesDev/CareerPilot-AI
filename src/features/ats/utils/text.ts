export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\w+#. -]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeKeyword(value: string): string {
  return normalizeText(value).replace(/\s+/g, " ");
}

export function uniqueNormalized(values: readonly string[]): string[] {
  const seen = new Set<string>();

  for (const value of values) {
    const normalized = normalizeKeyword(value);
    if (normalized) seen.add(normalized);
  }

  return Array.from(seen);
}

export function countWords(value: string): number {
  const normalized = normalizeText(value);
  if (!normalized) return 0;
  return normalized.split(" ").filter(Boolean).length;
}

export function includesKeyword(text: string, keyword: string): boolean {
  const normalizedText = normalizeText(text);
  const normalizedKeyword = normalizeKeyword(keyword);
  if (!normalizedText || !normalizedKeyword) return false;

  return normalizedText.includes(normalizedKeyword);
}

export function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function ratioToScore(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  return clampScore((numerator / denominator) * 100);
}
