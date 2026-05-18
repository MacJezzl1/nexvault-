import { createCollectionAction, createSpaceAction } from "@/app/actions";
import { CollectionCreateForm } from "@/components/vault/CollectionCreateForm";
import { SpaceCreateForm } from "@/components/vault/SpaceCreateForm";
import { SpaceCard } from "@/components/vault/SpaceCard";
import { getVaultSummary } from "@/services/vaultService";

export default async function SpacesPage() {
  const { spaces } = await getVaultSummary();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Spaces</h1>
      <p className="mt-3 text-steel">
        Spaces organize high-level knowledge domains like Engineering, Legal, or Learning.
      </p>
      <div className="mt-8 grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <SpaceCreateForm action={createSpaceAction} />
          <CollectionCreateForm
            action={createCollectionAction}
            spaces={spaces.map((space) => ({ id: space.id, name: space.name }))}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {spaces.map((space) => (
            <SpaceCard key={space.id} {...space} />
          ))}
        </div>
      </div>
    </main>
  );
}
