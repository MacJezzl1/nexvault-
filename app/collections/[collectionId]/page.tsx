import { ItemCard } from "@/components/vault/ItemCard";
import { getVaultSummary } from "@/services/vaultService";

type Props = {
  params: { collectionId: string };
};

export default async function CollectionPage({ params }: Props) {
  const { collections, items } = await getVaultSummary();
  const collection = collections.find((candidate) => candidate.id === params.collectionId);

  if (!collection) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-4xl font-semibold">Collection not found</h1>
      </main>
    );
  }

  const collectionItems = items.filter((item) => item.collectionId === params.collectionId);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">{collection.name}</h1>
      <p className="mt-3 text-steel">
        {collection.description}
      </p>
      <div className="mt-8 grid gap-4">
        {collectionItems.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            title={item.title}
            type={item.type}
            summary={item.summary}
          />
        ))}
      </div>
    </main>
  );
}
