type Props = {
  name: string;
  itemCount: number;
  insightCount: number;
  staleCount: number;
  healthScore: number;
};

export function VaultCard({ name, itemCount, insightCount, staleCount, healthScore }: Props) {
  return (
    <section className="rounded-[2rem] bg-ink p-8 text-sand shadow-vault">
      <p className="text-sm uppercase tracking-[0.3em] text-sand/60">Vault health</p>
      <h2 className="mt-4 text-3xl font-semibold">{name}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-3xl font-semibold">{itemCount}</p>
          <p className="text-sm text-sand/70">items indexed</p>
        </div>
        <div>
          <p className="text-3xl font-semibold">{insightCount}</p>
          <p className="text-sm text-sand/70">knowledge gaps</p>
        </div>
        <div>
          <p className="text-3xl font-semibold">{staleCount}</p>
          <p className="text-sm text-sand/70">stale collections</p>
        </div>
      </div>
      <p className="mt-8 text-sm text-sand/70">Knowledge health score: {healthScore}/100</p>
    </section>
  );
}
