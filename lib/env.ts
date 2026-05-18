type EnvironmentCheck = {
  name: string;
  configured: boolean;
  detail: string;
};

function present(value?: string) {
  return Boolean(value && value !== "replace-me");
}

export function getEnvironmentStatus() {
  const checks: EnvironmentCheck[] = [
    {
      name: "OpenAI",
      configured: present(process.env.OPENAI_API_KEY),
      detail: "Used for live Ask Vault responses."
    },
    {
      name: "Stripe secret",
      configured: present(process.env.STRIPE_SECRET_KEY),
      detail: "Used to create hosted checkout sessions."
    },
    {
      name: "Stripe webhook",
      configured: present(process.env.STRIPE_WEBHOOK_SECRET),
      detail: "Used to verify subscription webhooks."
    },
    {
      name: "App URL",
      configured: present(process.env.NEXT_PUBLIC_APP_URL),
      detail: "Used for redirect URLs after checkout."
    }
  ];

  return {
    readyForLiveBilling: checks.every((check) => check.configured || check.name === "OpenAI"),
    checks
  };
}
