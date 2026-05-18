"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createPlanCheckout } from "@/lib/billing";
import { updateUserPlan } from "@/lib/user-store";
import type { PlanId } from "@/lib/plans";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function startCheckoutAction(formData: FormData) {
  const user = await requireUser();
  const plan = getString(formData, "plan") as PlanId;

  if (!["free", "pro", "team", "business"].includes(plan)) {
    redirect("/pricing?error=plan");
  }

  if (plan === "free") {
    await updateUserPlan(user.id, "free");
    redirect("/pricing?success=free_plan");
  }

  const checkout = await createPlanCheckout({
    planId: plan,
    userId: user.id,
    email: user.email
  });

  if (checkout.mode === "mock") {
    await updateUserPlan(user.id, plan);
  }

  redirect(checkout.url);
}
