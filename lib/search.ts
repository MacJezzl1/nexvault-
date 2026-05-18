export async function hybridSearch(query: string, vaultId: string) {
  return {
    query,
    vaultId,
    strategy: "full-text + vector re-rank"
  };
}
