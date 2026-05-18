import { hybridSearch } from "@/lib/search";
import type { RetrievalScope } from "@/lib/vault-types";

export async function searchVault(scope: RetrievalScope | string) {
  const normalizedScope = typeof scope === "string" ? { query: scope } : scope;
  const results = await hybridSearch(normalizedScope, "vault-personal-1");
  return { ok: true, ...results };
}
