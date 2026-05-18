export async function embedText(input: string) {
  return {
    model: process.env.EMBEDDING_MODEL ?? "text-embedding-3-small",
    dimensions: 1536,
    input
  };
}
