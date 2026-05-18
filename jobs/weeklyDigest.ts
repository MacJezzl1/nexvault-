export async function weeklyDigestJob(vaultId: string) {
  return { vaultId, status: "queued" as const };
}
