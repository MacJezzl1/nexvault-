import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createPlanCheckout } from "@/lib/billing";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, message: "Authentication required" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { plan?: "free" | "pro" | "team" | "business" };
  if (!body.plan || !["free", "pro", "team", "business"].includes(body.plan)) {
    return NextResponse.json({ ok: false, message: "Valid plan is required" }, { status: 400 });
  }

  const checkout = await createPlanCheckout({
    planId: body.plan,
    userId: user.id,
    email: user.email
  });

  return NextResponse.json({ ok: true, ...checkout });
}
