import { createHmac, timingSafeEqual } from "crypto";
import { getPlanDefinition, type PlanId } from "@/lib/plans";

type CheckoutResult =
  | { mode: "stripe"; url: string }
  | { mode: "mock"; url: string };

function getPriceId(planId: PlanId) {
  if (planId === "pro") return process.env.STRIPE_PRICE_PRO;
  if (planId === "team") return process.env.STRIPE_PRICE_TEAM;
  if (planId === "business") return process.env.STRIPE_PRICE_BUSINESS;
  return undefined;
}

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export function isStripeConfigured() {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_SECRET_KEY !== "replace-me" &&
      process.env.NEXT_PUBLIC_APP_URL &&
      getPriceId("pro") &&
      getPriceId("team") &&
      getPriceId("business")
  );
}

export async function createPlanCheckout(input: {
  planId: PlanId;
  userId: string;
  email: string;
}): Promise<CheckoutResult> {
  if (input.planId === "free" || !isStripeConfigured()) {
    return {
      mode: "mock",
      url: `${appUrl()}/pricing?success=mock_checkout&plan=${encodeURIComponent(input.planId)}`
    };
  }

  const priceId = getPriceId(input.planId);
  if (!priceId) {
    return {
      mode: "mock",
      url: `${appUrl()}/pricing?success=mock_checkout&plan=${encodeURIComponent(input.planId)}`
    };
  }

  const body = new URLSearchParams();
  body.set("mode", "subscription");
  body.set("success_url", `${appUrl()}/pricing?success=checkout&plan=${encodeURIComponent(input.planId)}`);
  body.set("cancel_url", `${appUrl()}/pricing?error=checkout`);
  body.set("line_items[0][price]", priceId);
  body.set("line_items[0][quantity]", "1");
  body.set("customer_email", input.email);
  body.set("metadata[userId]", input.userId);
  body.set("metadata[planId]", input.planId);

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  if (!response.ok) {
    return {
      mode: "mock",
      url: `${appUrl()}/pricing?success=mock_checkout&plan=${encodeURIComponent(input.planId)}`
    };
  }

  const payload = (await response.json()) as { url?: string };

  return {
    mode: "stripe",
    url: payload.url || `${appUrl()}/pricing?error=checkout`
  };
}

export function verifyStripeWebhookSignature(payload: string, signatureHeader?: string | null) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !signatureHeader) {
    return false;
  }

  const entries = Object.fromEntries(
    signatureHeader.split(",").map((entry) => {
      const [key, value] = entry.split("=");
      return [key, value];
    })
  );

  const timestamp = entries.t;
  const provided = entries.v1;
  if (!timestamp || !provided) {
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expected = createHmac("sha256", secret).update(signedPayload).digest("hex");

  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(provided));
  } catch {
    return false;
  }
}

export function planSummary(planId: PlanId) {
  const plan = getPlanDefinition(planId);
  return `${plan.name} (${plan.priceLabel})`;
}
