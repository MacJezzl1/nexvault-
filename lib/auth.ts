import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserById, getSession } from "@/lib/user-store";

export const sessionCookieName = "nexvault_session";

export async function getCurrentUser() {
  const token = cookies().get(sessionCookieName)?.value;
  if (!token) {
    return null;
  }

  const session = await getSession(token);
  if (!session) {
    return null;
  }

  const user = await findUserById(session.userId);
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    plan: user.plan
  };
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  return user;
}
