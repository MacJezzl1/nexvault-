export function VaultCard() {
  return (
    <section className="rounded-[2rem] bg-ink p-8 text-sand shadow-vault">
      <p className="text-sm uppercase tracking-[0.3em] text-sand/60">Vault health</p>
      <h2 className="mt-4 text-3xl font-semibold">Personal Vault</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-3xl font-semibold">124</p>
          <p className="text-sm text-sand/70">items indexed</p>
        </div>
        <div>
          <p className="text-3xl font-semibold">9</p>
          <p className="text-sm text-sand/70">knowledge gaps</p>
        </div>
        <div>
          <p className="text-3xl font-semibold">3</p>
          <p className="text-sm text-sand/70">stale collections</p>
        </div>
      </div>
    </section>
  );
}
