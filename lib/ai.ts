export type RetrievedChunk = {
  itemId: string;
  chunkId: string;
  content: string;
  score: number;
};

export async function answerWithCitations(query: string, chunks: RetrievedChunk[]) {
  return {
    query,
    answer: "Implement provider-backed completion here.",
    citations: chunks.map((chunk) => ({
      itemId: chunk.itemId,
      chunkId: chunk.chunkId
    }))
  };
}
