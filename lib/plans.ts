export type PlanId = "free" | "pro" | "team" | "business";

export type PlanDefinition = {
  id: PlanId;
  name: string;
  priceLabel: string;
  audience: string;
  description: string;
  features: string[];
  limits: {
    items: number;
    monthlyQuestions: number;
    spaces: number;
  };
  highlighted?: boolean;
};

export const planDefinitions: PlanDefinition[] = [
  {
    id: "free",
    name: "Free",
    priceLabel: "$0",
    audience: "Personal trial",
    description: "Entry tier for testing private AI memory with smaller limits.",
    features: [
      "Personal vault",
      "Basic search",
      "Source-cited Ask Vault",
      "Manual organization"
    ],
    limits: {
      items: 50,
      monthlyQuestions: 20,
      spaces: 5
    }
  },
  {
    id: "pro",
    name: "Pro",
    priceLabel: "$19/mo",
    audience: "Power users",
    description: "Higher capture volume, stronger retrieval, and richer AI usage.",
    features: [
      "Everything in Free",
      "Higher item limit",
      "More AI questions",
      "OCR and import workflows"
    ],
    limits: {
      items: 500,
      monthlyQuestions: 250,
      spaces: 25
    },
    highlighted: true
  },
  {
    id: "team",
    name: "Team",
    priceLabel: "$39/user/mo",
    audience: "Small teams",
    description: "Shared knowledge spaces, role-based collaboration, and team retrieval.",
    features: [
      "Shared spaces",
      "Role-based access",
      "Shared Ask Vault",
      "Admin controls"
    ],
    limits: {
      items: 5000,
      monthlyQuestions: 2000,
      spaces: 100
    }
  },
  {
    id: "business",
    name: "Business",
    priceLabel: "$79/user/mo",
    audience: "Growing companies",
    description: "Security controls, larger usage envelopes, and launch-ready operations.",
    features: [
      "Everything in Team",
      "Audit visibility",
      "Priority support",
      "Retention controls"
    ],
    limits: {
      items: 20000,
      monthlyQuestions: 10000,
      spaces: 500
    }
  }
];

export function getPlanDefinition(planId: string) {
  return planDefinitions.find((plan) => plan.id === planId) ?? planDefinitions[0];
}
