import { demoItems, suggestedQuestions, type DemoConversationAnswer } from "@/lib/mock-data";

function pickConfidence(matchCount: number): DemoConversationAnswer["confidence"] {
  if (matchCount >= 3) {
    return "high";
  }
  if (matchCount >= 1) {
    return "medium";
  }
  return "low";
}

export async function askVault(query = suggestedQuestions[0]) {
  const normalized = query.toLowerCase();
  const matches = demoItems.filter((item) => {
    const haystack = `${item.title} ${item.summary} ${item.content} ${item.tags.join(" ")}`.toLowerCase();
    return normalized
      .split(/\s+/)
      .filter(Boolean)
      .some((term) => haystack.includes(term));
  });

  const topMatches = (matches.length ? matches : demoItems).slice(0, 3);

  const answer =
    topMatches.length === 0
      ? "The vault does not contain enough evidence to answer that."
      : `Based on ${topMatches.length} vault source${topMatches.length > 1 ? "s" : ""}, the strongest pattern is that ${topMatches
          .map((item) => item.summary.charAt(0).toLowerCase() + item.summary.slice(1))
          .join(" ")}`;

  return {
    ok: true,
    query,
    answer,
    confidence: pickConfidence(matches.length),
    citations: topMatches.map((item) => ({
      itemId: item.id,
      title: item.title,
      quote: item.content.split(". ").slice(0, 2).join(". ")
    })),
    followUps: suggestedQuestions.filter((prompt) => prompt !== query).slice(0, 3)
  };
}
