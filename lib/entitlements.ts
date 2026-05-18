import { getCurrentUser } from "@/lib/auth";
import { getPlanDefinition } from "@/lib/plans";
import { findUserById, getUserUsage } from "@/lib/user-store";

export class UsageLimitError extends Error {
  code: "items" | "spaces" | "questions";
  limit: number;
  planId: string;

  constructor(code: "items" | "spaces" | "questions", limit: number, planId: string) {
    super(`Plan limit reached for ${code}`);
    this.code = code;
    this.limit = limit;
    this.planId = planId;
  }
}

export async function getCurrentPlanContext() {
  const user = await getCurrentUser();
  const persistedUser = user ? await findUserById(user.id) : null;
  const plan = getPlanDefinition(persistedUser?.plan ?? user?.plan ?? "free");
  const usage = persistedUser ? await getUserUsage(persistedUser.id) : null;

  return {
    user: persistedUser
      ? {
          id: persistedUser.id,
          email: persistedUser.email,
          name: persistedUser.name,
          plan: persistedUser.plan
        }
      : user,
    plan,
    usage
  };
}

export async function ensureCanCreateItem(currentItemCount: number) {
  const { plan } = await getCurrentPlanContext();
  if (currentItemCount >= plan.limits.items) {
    throw new UsageLimitError("items", plan.limits.items, plan.id);
  }
}

export async function ensureCanCreateSpace(currentSpaceCount: number) {
  const { plan } = await getCurrentPlanContext();
  if (currentSpaceCount >= plan.limits.spaces) {
    throw new UsageLimitError("spaces", plan.limits.spaces, plan.id);
  }
}

export async function ensureCanAskQuestion() {
  const { plan, usage } = await getCurrentPlanContext();
  const used = usage?.monthlyQuestionCount ?? 0;

  if (used >= plan.limits.monthlyQuestions) {
    throw new UsageLimitError("questions", plan.limits.monthlyQuestions, plan.id);
  }
}
