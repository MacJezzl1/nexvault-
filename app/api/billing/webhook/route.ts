import { NextResponse } from "next/server";
import { verifyStripeWebhookSignature } from "@/lib/billing";
import { updateUserPlan } from "@/lib/user-store";

type StripeEvent = {
  type?: string;
  data?: {
    object?: {
      metadata?: {
        userId?: string;
        planId?: "free" | "pro" | "team" | "business";
      };
    };
  };
};

export async function POST(request: Request) {
  const raw = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (process.env.STRIPE_WEBHOOK_SECRET && !verifyStripeWebhookSignature(raw, signature)) {
    return NextResponse.json({ ok: false, message: "Invalid webhook signature" }, { status: 400 });
  }

  const event = JSON.parse(raw || "{}") as StripeEvent;
  const metadata = event.data?.object?.metadata;

  if (
    event.type === "checkout.session.completed" &&
    metadata?.userId &&
    metadata?.planId &&
    ["free", "pro", "team", "business"].includes(metadata.planId)
  ) {
    await updateUserPlan(metadata.userId, metadata.planId);
  }

  return NextResponse.json({ ok: true });
}
