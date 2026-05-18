"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSession, createUser, findUserByEmail, hashPassword } from "@/lib/user-store";

const sessionCookieName = "nexvault_session";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function signInAction(formData: FormData) {
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");

  if (!email || !password) {
    redirect("/auth/sign-in?error=missing");
  }

  const user = await findUserByEmail(email);
  if (!user || user.passwordHash !== hashPassword(password)) {
    redirect("/auth/sign-in?error=invalid");
  }

  const session = await createSession(user.id);
  cookies().set(sessionCookieName, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/"
  });

  redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
  const name = getString(formData, "name");
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");

  if (!name || !email || password.length < 8) {
    redirect("/auth/sign-up?error=invalid_signup");
  }

  const created = await createUser({ name, email, password });
  if (!created.ok) {
    redirect("/auth/sign-up?error=exists");
  }

  const session = await createSession(created.user.id);
  cookies().set(sessionCookieName, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/"
  });

  redirect("/dashboard");
}

export async function signOutAction() {
  const token = cookies().get(sessionCookieName)?.value;
  if (token) {
    const { deleteSession } = await import("@/lib/user-store");
    await deleteSession(token);
  }

  cookies().delete(sessionCookieName);
  redirect("/");
}
