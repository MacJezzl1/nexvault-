import { CollectionTree } from "@/components/vault/CollectionTree";
import { ItemCard } from "@/components/vault/ItemCard";
import { getVaultSummary } from "@/services/vaultService";

export default async function VaultsPage() {
  const { vault, collections, items } = await getVaultSummary();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">{vault.name}</h1>
      <p className="mt-3 text-steel">
        {vault.mode} mode for {vault.owner}. This prototype keeps personal and organization memory on one model.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <CollectionTree
          collections={collections.map((collection) => ({
            id: collection.id,
            name: collection.name
          }))}
        />
        <section className="rounded-[2rem] bg-white/80 p-6 shadow-vault">
          <p className="text-sm uppercase tracking-[0.3em] text-steel">All indexed items</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                type={item.type}
                summary={item.summary}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
