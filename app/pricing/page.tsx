import { PlanCard } from "@/components/pricing/PlanCard";
import { getCurrentUser } from "@/lib/auth";
import { planDefinitions } from "@/lib/plans";

type Props = {
  searchParams?: {
    success?: string;
    error?: string;
  };
};

export default async function PricingPage({ searchParams }: Props) {
  const user = await getCurrentUser();

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
          Plan updated locally. Stripe billing is not wired yet, but the app now supports tier selection.
        </p>
      ) : null}
      {searchParams?.error ? (
        <p className="mt-6 rounded-2xl bg-white/80 px-4 py-3 text-sm text-amber shadow-vault dark:bg-neutral-900/80">
          That plan selection was not valid.
        </p>
      ) : null}
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
