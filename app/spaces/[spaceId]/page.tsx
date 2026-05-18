import { createCollectionAction, createNoteAction } from "@/app/actions";
import { CollectionCreateForm } from "@/components/vault/CollectionCreateForm";
import { CollectionTree } from "@/components/vault/CollectionTree";
import { ItemCard } from "@/components/vault/ItemCard";
import { UploadDropzone } from "@/components/vault/UploadDropzone";
import { getVaultSummary } from "@/services/vaultService";

type Props = {
  params: { spaceId: string };
};

export default async function SpaceDetailPage({ params }: Props) {
  const { spaces, collections, items } = await getVaultSummary();
  const space = spaces.find((candidate) => candidate.id === params.spaceId);

  if (!space) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-4xl font-semibold">Space not found</h1>
      </main>
    );
  }

  const spaceCollections = collections.filter((collection) => collection.spaceId === params.spaceId);
  const spaceItems = items.filter((item) => item.spaceId === params.spaceId);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">{space.name}</h1>
      <p className="mt-3 text-steel">{space.description}</p>
      <div className="mt-8">
        <UploadDropzone
          action={createNoteAction}
          spaces={[{ id: space.id, name: space.name }]}
          collections={spaceCollections.map((collection) => ({
            id: collection.id,
            name: collection.name
          }))}
        />
      </div>
      <div className="mt-6">
        <CollectionCreateForm
          action={createCollectionAction}
          spaces={[{ id: space.id, name: space.name }]}
          defaultSpaceId={space.id}
        />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <CollectionTree
          collections={spaceCollections.map((collection) => ({
            id: collection.id,
            name: collection.name
          }))}
        />
        <section className="rounded-[2rem] bg-white/80 p-6 shadow-vault">
          <p className="text-sm uppercase tracking-[0.3em] text-steel">Items</p>
          <div className="mt-4 grid gap-4">
            {spaceItems.map((item) => (
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
