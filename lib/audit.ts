export async function logAuditEvent(action: string, resourceType: string, resourceId: string) {
  return { action, resourceType, resourceId, timestamp: new Date().toISOString() };
}
