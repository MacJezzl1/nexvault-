import { getCurrentUser } from "@/lib/auth";
import { getVaultSnapshot } from "@/lib/vault-store";
import { getPlanDefinition } from "@/lib/plans";
import { findUserById, getUserUsage } from "@/lib/user-store";

export async function createVault() {
  const { vault } = await getVaultSnapshot();
  return { ok: true, vault };
}

export async function getVaultSummary() {
  const snapshot = await getVaultSnapshot();
  const user = await getCurrentUser();
  const persistedUser = user ? await findUserById(user.id) : null;
  const plan = getPlanDefinition(persistedUser?.plan ?? user?.plan ?? "free");
  const usageState = persistedUser ? await getUserUsage(persistedUser.id) : null;

  return {
    ...snapshot,
    plan,
    usage: {
      items: snapshot.items.length,
      spaces: snapshot.spaces.length,
      monthlyQuestionsUsed: usageState?.monthlyQuestionCount ?? 0,
      itemsRemaining: Math.max(plan.limits.items - snapshot.items.length, 0),
      spacesRemaining: Math.max(plan.limits.spaces - snapshot.spaces.length, 0)
    }
  };
}
