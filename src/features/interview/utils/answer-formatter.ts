export function formatAnswer(content: string): string {
  return content.replace(/\s+/g, " ").trim();
}

export function countWords(content: string): number {
  const formatted = formatAnswer(content);
  return formatted ? formatted.split(" ").length : 0;
}
