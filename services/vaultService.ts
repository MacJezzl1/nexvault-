import { getVaultSnapshot } from "@/lib/vault-store";

export async function createVault() {
  const { vault } = await getVaultSnapshot();
  return { ok: true, vault };
}

export async function getVaultSummary() {
  return getVaultSnapshot();
}
