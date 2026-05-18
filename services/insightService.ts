import { getInsights } from "@/lib/vault-store";

export async function listInsights() {
  return getInsights();
}
