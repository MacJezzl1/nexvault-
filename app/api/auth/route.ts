import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCurrentUser, sessionCookieName } from "@/lib/auth";
import { deleteSession } from "@/lib/user-store";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({ ok: true, user });
}

export async function DELETE() {
  const token = cookies().get(sessionCookieName)?.value;
  if (token) {
    await deleteSession(token);
  }

  cookies().delete(sessionCookieName);
  return NextResponse.json({ ok: true });
}
