import { startCheckoutAction } from "@/app/billing/actions";
import type { PlanDefinition } from "@/lib/plans";

type Props = {
  plan: PlanDefinition;
  currentPlanId: string;
  signedIn: boolean;
};

export function PlanCard({ plan, currentPlanId, signedIn }: Props) {
  const isCurrent = currentPlanId === plan.id;

  return (
    <article
      className={`rounded-[1.75rem] border p-6 shadow-vault ${
        plan.highlighted
          ? "border-amber bg-white/90 dark:border-amber dark:bg-neutral-900/80"
          : "border-black/5 bg-white/80 dark:border-white/10 dark:bg-neutral-900/70"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-steel dark:text-neutral-400">
            {plan.audience}
          </p>
          <h2 className="mt-2 text-2xl font-semibold">{plan.name}</h2>
        </div>
        {isCurrent ? (
          <span className="rounded-full bg-sand px-3 py-2 text-xs dark:bg-neutral-800">
            Current plan
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-3xl font-semibold">{plan.priceLabel}</p>
      <p className="mt-3 text-sm leading-6 text-steel dark:text-neutral-300">{plan.description}</p>
      <ul className="mt-5 space-y-2 text-sm text-steel dark:text-neutral-300">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="mt-5 rounded-2xl bg-sand/80 p-4 text-sm dark:bg-neutral-800">
        <p>Items: {plan.limits.items.toLocaleString()}</p>
        <p>Monthly AI questions: {plan.limits.monthlyQuestions.toLocaleString()}</p>
        <p>Spaces: {plan.limits.spaces.toLocaleString()}</p>
      </div>
      {signedIn ? (
        <form action={startCheckoutAction} className="mt-5">
          <input type="hidden" name="plan" value={plan.id} />
          <button
            type="submit"
            disabled={isCurrent}
            className="rounded-full bg-ink px-4 py-2 text-sm text-sand disabled:opacity-50 dark:bg-sand dark:text-ink"
          >
            {isCurrent ? "Selected" : plan.id === "free" ? "Switch to Free" : `Start ${plan.name}`}
          </button>
        </form>
      ) : (
        <a
          href="/auth/sign-up"
          className="mt-5 inline-block rounded-full bg-ink px-4 py-2 text-sm text-sand dark:bg-sand dark:text-ink"
        >
          Create account
        </a>
      )}
    </article>
  );
}
