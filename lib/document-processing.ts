function summarize(text: string) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "No content provided yet.";
  }

  const firstSentence = cleaned.split(/[.!?]/).find(Boolean)?.trim() ?? cleaned;
  return firstSentence.length > 180 ? `${firstSentence.slice(0, 177)}...` : firstSentence;
}

function detectTags(text: string) {
  const haystack = text.toLowerCase();
  const tags = new Set<string>();

  if (haystack.includes("onboarding") || haystack.includes("activation")) tags.add("Onboarding");
  if (haystack.includes("security") || haystack.includes("permission") || haystack.includes("prompt injection")) tags.add("Security");
  if (haystack.includes("research") || haystack.includes("market") || haystack.includes("rag")) tags.add("Research");
  if (haystack.includes("finance") || haystack.includes("budget")) tags.add("Finance");
  if (haystack.includes("contract") || haystack.includes("legal")) tags.add("Legal");

  return Array.from(tags.size ? tags : new Set(["Research"]));
}

function detectSensitivity(text: string) {
  const haystack = text.toLowerCase();
  if (haystack.includes("budget") || haystack.includes("finance")) return "financial" as const;
  if (haystack.includes("contract") || haystack.includes("nda") || haystack.includes("legal")) return "contract" as const;
  if (haystack.includes("product") || haystack.includes("launch") || haystack.includes("roadmap")) return "product" as const;
  return "normal" as const;
}

function detectTrustLevel(source?: string) {
  if (!source) return "personal_note" as const;
  if (source === "upload") return "imported" as const;
  return "draft" as const;
}

export async function processDocument(title: string, content: string, source?: string) {
  const combined = `${title}\n${content}`;

  return {
    extractedText: content,
    summary: summarize(combined),
    language: "en",
    suggestedTags: detectTags(combined),
    trustLevel: detectTrustLevel(source),
    sensitivity: detectSensitivity(combined)
  };
}
