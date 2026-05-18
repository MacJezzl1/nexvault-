export async function canReadItem(userId: string, itemId: string) {
  return Boolean(userId && itemId);
}
