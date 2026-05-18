import { formatDate } from "@/lib/utils";
import { readVaultState } from "@/lib/vault-store";
import type { ItemRecord, RetrievalScope } from "@/lib/vault-types";

export type SearchResult = {
  itemId: string;
  title: string;
  summary: string;
  excerpt: string;
  spaceId: string;
  spaceName: string;
  collectionId: string;
  score: number;
  matchedTerms: string[];
  type: ItemRecord["type"];
  trustLevel: ItemRecord["trustLevel"];
  sensitivity: ItemRecord["sensitivity"];
  updatedAt: string;
  updatedLabel: string;
};

function buildExcerpt(content: string, query: string) {
  const normalized = query.trim().toLowerCase();
  const compact = content.replace(/\s+/g, " ").trim();

  if (!compact) {
    return "No extracted content available yet.";
  }

  if (!normalized) {
    return compact.slice(0, 180);
  }

  const index = compact.toLowerCase().indexOf(normalized);
  if (index === -1) {
    return compact.slice(0, 180);
  }

  const start = Math.max(0, index - 60);
  const end = Math.min(compact.length, index + normalized.length + 120);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < compact.length ? "..." : "";
  return `${prefix}${compact.slice(start, end)}${suffix}`;
}

function applyScope(item: ItemRecord, scope: RetrievalScope) {
  if (scope.spaceId && item.spaceId !== scope.spaceId) {
    return false;
  }

  if (scope.type && item.type !== scope.type) {
    return false;
  }

  if (scope.tag && !item.tags.includes(scope.tag)) {
    return false;
  }

  if (scope.trustLevel && item.trustLevel !== scope.trustLevel) {
    return false;
  }

  if (scope.sensitivity && item.sensitivity !== scope.sensitivity) {
    return false;
  }

  return true;
}

export async function hybridSearch(scope: RetrievalScope, vaultId: string) {
  const state = await readVaultState();
  const query = scope.query?.trim() ?? "";
  const normalized = query.toLowerCase();
  const terms = normalized.split(/\s+/).filter(Boolean);
  const scopedItems = state.items.filter((item) => applyScope(item, scope));

  const results = scopedItems
    .map((item) => {
      const haystack = `${item.title} ${item.summary} ${item.content} ${item.tags.join(" ")} ${item.trustLevel} ${item.sensitivity}`.toLowerCase();
      const matchedTerms = terms.filter((term) => haystack.includes(term));
      const score =
        matchedTerms.length * 3 +
        (normalized && item.title.toLowerCase().includes(normalized) ? 4 : 0) +
        (normalized && item.summary.toLowerCase().includes(normalized) ? 2 : 0) +
        (normalized && item.content.toLowerCase().includes(normalized) ? 1 : 0) +
        (scope.tag && item.tags.includes(scope.tag) ? 1 : 0);

      return {
        itemId: item.id,
        title: item.title,
        summary: item.summary,
        excerpt: buildExcerpt(item.content, query),
        spaceId: item.spaceId,
        spaceName: state.spaces.find((space) => space.id === item.spaceId)?.name ?? "Unknown",
        collectionId: item.collectionId,
        score,
        matchedTerms,
        type: item.type,
        trustLevel: item.trustLevel,
        sensitivity: item.sensitivity,
        updatedAt: item.updatedAt,
        updatedLabel: formatDate(item.updatedAt)
      };
    })
    .filter((result) => !query || result.score > 0)
    .sort((left, right) => right.score - left.score || right.updatedAt.localeCompare(left.updatedAt));

  return {
    query,
    vaultId,
    strategy: query ? "scoped full-text retrieval" : "scoped recency fallback",
    appliedScope: scope,
    results
  };
}
