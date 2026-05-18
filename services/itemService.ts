import { readVaultState } from "@/lib/vault-store";

export async function createItem() {
  return { ok: true };
}

export async function listItems() {
  const state = await readVaultState();
  return state.items;
}

export async function getItemDetail(itemId: string) {
  const state = await readVaultState();
  const item = state.items.find((candidate) => candidate.id === itemId);

  if (!item) {
    return null;
  }

  const relatedItems = state.items.filter(
    (candidate) =>
      candidate.id !== itemId &&
      candidate.tags.some((tag) => item.tags.includes(tag))
  );

  return {
    item,
    relatedItems
  };
}
