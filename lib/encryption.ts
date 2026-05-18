export function redactSensitiveMetadata(metadata: Record<string, unknown>) {
  const copy = { ...metadata };
  delete copy["password"];
  delete copy["secret"];
  return copy;
}
