export async function summarizeItemJob(itemId: string) {
  return { itemId, status: "queued" as const };
}
