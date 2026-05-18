import type { SearchResult } from "@/lib/search";

function hasConfiguredApiKey() {
  const key = process.env.OPENAI_API_KEY;
  return Boolean(key && key !== "replace-me");
}

function buildFallbackAnswer(query: string, chunks: SearchResult[]) {
  const summary = chunks
    .slice(0, 3)
    .map((chunk) => chunk.summary.charAt(0).toLowerCase() + chunk.summary.slice(1))
    .join(" ");

  return summary
    ? `Based on retrieved vault evidence for "${query}", the strongest pattern is that ${summary}`
    : "The vault does not contain enough high-confidence evidence to answer that yet.";
}

function buildPrompt(query: string, chunks: SearchResult[]) {
  const sources = chunks
    .slice(0, 5)
    .map(
      (chunk, index) =>
        `Source ${index + 1}\nTitle: ${chunk.title}\nSpace: ${chunk.spaceName}\nType: ${chunk.type}\nSummary: ${chunk.summary}\nExcerpt: ${chunk.excerpt}`
    )
    .join("\n\n");

  return `You are answering questions about a private vault. Use only the provided sources. If the evidence is weak, say so explicitly. Separate facts from suggestions. Query: ${query}\n\n${sources}`;
}

export async function answerWithCitations(query: string, chunks: SearchResult[]) {
  if (!chunks.length || !hasConfiguredApiKey()) {
    return {
      answer: buildFallbackAnswer(query, chunks),
      provider: "heuristic" as const
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.CHAT_MODEL || "gpt-4.1-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "Answer using only the retrieved vault evidence. Never invent facts. If evidence is insufficient, say so."
          },
          {
            role: "user",
            content: buildPrompt(query, chunks)
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed with ${response.status}`);
    }

    const payload = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
    };

    const answer = payload.choices?.[0]?.message?.content?.trim();

    return {
      answer: answer || buildFallbackAnswer(query, chunks),
      provider: answer ? ("openai" as const) : ("heuristic" as const)
    };
  } catch {
    return {
      answer: buildFallbackAnswer(query, chunks),
      provider: "heuristic" as const
    };
  }
}
