import { hybridSearch } from "@/lib/search";

export async function searchVault(query: string) {
  const results = await hybridSearch(query, "vault-personal-1");
  return { ok: true, ...results };
}
