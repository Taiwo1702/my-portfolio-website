export const portfolioProjectIds = [
  "onboarding",
  "email",
  "voice",
  "social",
  "commercial",
  "storytelling",
  "explainer",
  "website",
] as const;

export type PortfolioProjectId = (typeof portfolioProjectIds)[number];

export type PortfolioRecommendation = {
  projectId: PortfolioProjectId;
  reason: string;
};

export function parseProjectRecommendations(raw: string): PortfolioRecommendation[] {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }

  if (typeof data !== "object" || data === null || !("recommendations" in data)) return [];
  const recommendations = data.recommendations;
  if (!Array.isArray(recommendations)) return [];

  const knownIds = new Set<string>(portfolioProjectIds);
  const seen = new Set<string>();
  const parsed: PortfolioRecommendation[] = [];

  for (const item of recommendations) {
    if (typeof item !== "object" || item === null || !("projectId" in item) || !("reason" in item)) continue;
    const projectId = item.projectId;
    const reason = item.reason;
    if (typeof projectId !== "string" || !knownIds.has(projectId) || seen.has(projectId)) continue;
    if (typeof reason !== "string" || reason.trim().length === 0) continue;
    parsed.push({ projectId: projectId as PortfolioProjectId, reason: reason.trim().slice(0, 240) });
    seen.add(projectId);
    if (parsed.length === 3) break;
  }

  return parsed;
}