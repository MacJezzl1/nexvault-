export async function detectTagsJob(itemId: string) {
  return { itemId, status: "queued" as const };
}
