import { listInsights } from "@/services/insightService";

export default async function InsightsPage() {
  const insights = await listInsights();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Insights</h1>
      <p className="mt-3 text-steel">
        Use this surface for stale knowledge, repeated themes, missing docs, and duplicates.
      </p>
      <div className="mt-8 grid gap-4">
        {insights.map((insight) => (
          <article key={insight.id} className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{insight.title}</h2>
              <span className="rounded-full bg-sand px-3 py-1 text-xs uppercase tracking-[0.2em]">
                {insight.severity}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-steel">{insight.detail}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
