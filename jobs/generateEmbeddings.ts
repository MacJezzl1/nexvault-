export async function generateEmbeddingsJob(itemId: string) {
  return { itemId, status: "queued" as const };
}
