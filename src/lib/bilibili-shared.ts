/** 从任意字符串中解析 B 站 bvid（BV + 10 位） */
export function extractBvid(value?: string | null): string | null {
  if (!value) return null;
  const match = String(value).match(/BV[0-9A-Za-z]{10}/);
  return match?.[0] ?? null;
}
