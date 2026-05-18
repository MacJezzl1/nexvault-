import { getCurrentUser } from "@/lib/auth";
import { getVaultSnapshot } from "@/lib/vault-store";
import { getPlanDefinition } from "@/lib/plans";

export async function createVault() {
  const { vault } = await getVaultSnapshot();
  return { ok: true, vault };
}

export async function getVaultSummary() {
  const snapshot = await getVaultSnapshot();
  const user = await getCurrentUser();
  const plan = getPlanDefinition(user?.plan ?? "free");

  return {
    ...snapshot,
    plan,
    usage: {
      items: snapshot.items.length,
      spaces: snapshot.spaces.length,
      monthlyQuestionsUsed: Math.min(snapshot.timeline.length * 3, plan.limits.monthlyQuestions),
      itemsRemaining: Math.max(plan.limits.items - snapshot.items.length, 0),
      spacesRemaining: Math.max(plan.limits.spaces - snapshot.spaces.length, 0)
    }
  };
}
