import { demoItems, demoSpaces } from "@/lib/mock-data";

export type SearchResult = {
  itemId: string;
  title: string;
  summary: string;
  spaceName: string;
  score: number;
  matchedTerms: string[];
  type: string;
  updatedAt: string;
};

export async function hybridSearch(query: string, vaultId: string) {
  const normalized = query.trim().toLowerCase();
  const terms = normalized.split(/\s+/).filter(Boolean);

  if (!normalized) {
    return {
      query,
      vaultId,
      strategy: "full-text + semantic fallback",
      results: demoItems.map((item) => ({
        itemId: item.id,
        title: item.title,
        summary: item.summary,
        spaceName: demoSpaces.find((space) => space.id === item.spaceId)?.name ?? "Unknown",
        score: 0.5,
        matchedTerms: [],
        type: item.type,
        updatedAt: item.updatedAt
      }))
    };
  }

  const results = demoItems
    .map((item) => {
      const haystack = `${item.title} ${item.summary} ${item.content} ${item.tags.join(" ")}`.toLowerCase();
      const matchedTerms = terms.filter((term) => haystack.includes(term));
      const score =
        matchedTerms.length * 3 +
        (item.title.toLowerCase().includes(normalized) ? 3 : 0) +
        (item.summary.toLowerCase().includes(normalized) ? 2 : 0) +
        (item.content.toLowerCase().includes(normalized) ? 1 : 0);

      return {
        itemId: item.id,
        title: item.title,
        summary: item.summary,
        spaceName: demoSpaces.find((space) => space.id === item.spaceId)?.name ?? "Unknown",
        score,
        matchedTerms,
        type: item.type,
        updatedAt: item.updatedAt
      };
    })
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score);

  return {
    query,
    vaultId,
    strategy: "full-text + semantic fallback",
    results
  };
}
