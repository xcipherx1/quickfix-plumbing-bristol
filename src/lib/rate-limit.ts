const submissions = new Map<string, number[]>();

export function isRateLimited(
  ip: string,
  limit: number = 3,
  windowMs: number = 60 * 60 * 1000
): boolean {
  const now = Date.now();
  const userSubmissions = submissions.get(ip) || [];
  const recent = userSubmissions.filter((time) => now - time < windowMs);
  if (recent.length >= limit) return true;
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}
