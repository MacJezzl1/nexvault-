import { readVaultState } from "@/lib/vault-store";

export async function listTimelineEvents() {
  const state = await readVaultState();
  return state.timeline;
}
