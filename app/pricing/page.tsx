import { PlanCard } from "@/components/pricing/PlanCard";
import { getCurrentUser } from "@/lib/auth";
import { getEnvironmentStatus } from "@/lib/env";
import { planDefinitions } from "@/lib/plans";

type Props = {
  searchParams?: {
    success?: string;
    error?: string;
  };
};

export default async function PricingPage({ searchParams }: Props) {
  const user = await getCurrentUser();
  const env = getEnvironmentStatus();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-steel">Pricing</p>
          <h1 className="mt-3 text-4xl font-semibold">Launch pricing for private AI memory</h1>
          <p className="mt-3 max-w-3xl text-steel">
            This product should monetize through subscriptions and usage limits, not ads.
            Privacy-first software loses trust when ads are mixed into sensitive data workflows.
          </p>
        </div>
      </div>
      {searchParams?.success ? (
        <p className="mt-6 rounded-2xl bg-white/80 px-4 py-3 text-sm text-steel shadow-vault dark:bg-neutral-900/80 dark:text-neutral-300">
          {searchParams.success === "mock_checkout"
            ? "Stripe is not configured, so the plan was upgraded locally for testing."
            : searchParams.success === "checkout"
              ? "Checkout completed. The selected plan should now be active."
              : searchParams.success === "free_plan"
                ? "Plan switched back to Free."
                : "Pricing state updated."}
        </p>
      ) : null}
      {searchParams?.error ? (
        <p className="mt-6 rounded-2xl bg-white/80 px-4 py-3 text-sm text-amber shadow-vault dark:bg-neutral-900/80">
          {searchParams.error === "checkout"
            ? "Checkout was cancelled or could not be created."
            : "That plan selection was not valid."}
        </p>
      ) : null}
      <section className="mt-6 rounded-[1.75rem] bg-white/80 p-6 shadow-vault dark:bg-neutral-900/80">
        <p className="text-sm uppercase tracking-[0.3em] text-steel">Billing readiness</p>
        <p className="mt-3 text-sm text-steel">
          {env.readyForLiveBilling
            ? "Stripe checkout is configured for live-style testing."
            : "Billing is running in local fallback mode until Stripe env vars are configured."}
        </p>
      </section>
      <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {planDefinitions.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currentPlanId={user?.plan ?? "free"}
            signedIn={Boolean(user)}
          />
        ))}
      </div>
    </main>
  );
}
