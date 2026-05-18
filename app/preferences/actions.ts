"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { themeCookieName, normalizeTheme } from "@/lib/theme";
import { updateUserPlan } from "@/lib/user-store";
import { requireUser } from "@/lib/auth";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function setThemeAction(formData: FormData) {
  const theme = normalizeTheme(getString(formData, "theme"));
  const returnTo = getString(formData, "returnTo") || "/settings";

  cookies().set(themeCookieName, theme, {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/"
  });

  redirect(returnTo);
}

export async function updatePlanAction(formData: FormData) {
  const user = await requireUser();
  const plan = getString(formData, "plan");
  const returnTo = getString(formData, "returnTo") || "/pricing";

  if (!["free", "pro", "team", "business"].includes(plan)) {
    redirect(`${returnTo}?error=plan`);
  }

  await updateUserPlan(user.id, plan as "free" | "pro" | "team" | "business");
  redirect(`${returnTo}?success=plan`);
}
