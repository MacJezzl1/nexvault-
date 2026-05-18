export function buildObjectKey(vaultId: string, itemId: string, filename: string) {
  return `${vaultId}/${itemId}/${filename}`;
}
