import { demoItems, getItemById } from "@/lib/mock-data";

export async function createItem() {
  return { ok: true };
}

export async function listItems() {
  return demoItems;
}

export async function getItemDetail(itemId: string) {
  const item = getItemById(itemId);

  if (!item) {
    return null;
  }

  const relatedItems = demoItems.filter(
    (candidate) =>
      candidate.id !== itemId &&
      candidate.tags.some((tag) => item.tags.includes(tag))
  );

  return {
    item,
    relatedItems
  };
}
