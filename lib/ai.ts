export type RetrievedChunk = {
  itemId: string;
  chunkId: string;
  content: string;
  score: number;
};

export async function answerWithCitations(query: string, chunks: RetrievedChunk[]) {
  const summary = chunks
    .slice(0, 2)
    .map((chunk) => chunk.content.split(".")[0]?.trim())
    .filter(Boolean)
    .join(". ");

  return {
    query,
    answer:
      summary ||
      "The vault does not contain enough high-confidence evidence to answer that yet.",
    citations: chunks.map((chunk) => ({
      itemId: chunk.itemId,
      chunkId: chunk.chunkId
    }))
  };
}
