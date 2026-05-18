import { answerWithCitations } from "@/lib/ai";
import { getCurrentUser } from "@/lib/auth";
import { ensureCanAskQuestion, UsageLimitError } from "@/lib/entitlements";
import { suggestedQuestions } from "@/lib/mock-data";
import { hybridSearch } from "@/lib/search";
import { incrementUserQuestionUsage } from "@/lib/user-store";
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

export async function askVault(scope: RetrievalScope | string = suggestedQuestions[0]) {
  const normalizedScope = typeof scope === "string" ? { query: scope } : scope;
  const query = normalizedScope.query?.trim() || suggestedQuestions[0];

  try {
    await ensureCanAskQuestion();
  } catch (error) {
    if (error instanceof UsageLimitError) {
      return {
        ok: false,
        query,
        answer: `You have reached the monthly AI question limit for the ${error.planId} plan. Upgrade your plan to continue using Ask Vault.`,
        confidence: "low" as const,
        citations: [],
        followUps: ["Open pricing", "Review recent items", "Narrow the search scope"],
        scope: normalizedScope,
        retrievalCount: 0,
        provider: "heuristic" as const,
        limitReached: true,
        limitMessage: `Monthly question limit: ${error.limit}`
      };
    }

    throw error;
  }

  const result = await hybridSearch({ ...normalizedScope, query }, "vault-personal-1");
  const topMatches = result.results.slice(0, 3);
  const generated = await answerWithCitations(query, topMatches);
  const user = await getCurrentUser();

  if (user) {
    await incrementUserQuestionUsage(user.id);
  }

  return {
    ok: true,
    query,
    answer:
      topMatches.length === 0
        ? "The vault does not contain enough evidence to answer that. Try widening the scope or removing one of the filters."
        : generated.answer,
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
    retrievalCount: topMatches.length,
    provider: generated.provider
  };
}
