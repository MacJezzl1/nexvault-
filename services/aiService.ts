import { suggestedQuestions } from "@/lib/mock-data";
import { hybridSearch } from "@/lib/search";
import type { ConversationAnswer, RetrievalScope } from "@/lib/vault-types";

function pickConfidence(matchCount: number): ConversationAnswer["confidence"] {
  if (matchCount >= 3) {
    return "high";
  }
  if (matchCount >= 1) {
    return "medium";
  }
  return "low";
}

function describeScope(scope: RetrievalScope) {
  const parts = [
    scope.spaceId ? "the selected space" : "",
    scope.type ? `${scope.type.replaceAll("_", " ")} items` : "",
    scope.tag ? `tagged ${scope.tag}` : "",
    scope.trustLevel ? `trust level ${scope.trustLevel}` : "",
    scope.sensitivity ? `sensitivity ${scope.sensitivity}` : ""
  ].filter(Boolean);

  return parts.length ? ` within ${parts.join(", ")}` : "";
}

export async function askVault(scope: RetrievalScope | string = suggestedQuestions[0]) {
  const normalizedScope = typeof scope === "string" ? { query: scope } : scope;
  const query = normalizedScope.query?.trim() || suggestedQuestions[0];
  const result = await hybridSearch({ ...normalizedScope, query }, "vault-personal-1");
  const topMatches = result.results.slice(0, 3);
  const scopedLabel = describeScope(normalizedScope);

  const answer =
    topMatches.length === 0
      ? `The vault does not contain enough evidence to answer that${scopedLabel}. Try widening the scope or removing one of the filters.`
      : `Using ${topMatches.length} retrieved source${topMatches.length > 1 ? "s" : ""}${scopedLabel}, the current evidence suggests ${topMatches
          .map((item) => item.summary.charAt(0).toLowerCase() + item.summary.slice(1))
          .join(" ")}`;

  return {
    ok: true,
    query,
    answer,
    confidence: pickConfidence(topMatches.length),
    citations: topMatches.map((item) => ({
      itemId: item.itemId,
      title: item.title,
      quote: item.excerpt,
      spaceName: item.spaceName,
      itemType: item.type
    })),
    followUps: suggestedQuestions.filter((prompt) => prompt !== query).slice(0, 3),
    scope: normalizedScope,
    retrievalCount: topMatches.length
  };
}
