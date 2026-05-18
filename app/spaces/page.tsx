import { createCollectionAction, createSpaceAction } from "@/app/actions";
import { CollectionCreateForm } from "@/components/vault/CollectionCreateForm";
import { SpaceCreateForm } from "@/components/vault/SpaceCreateForm";
import { SpaceCard } from "@/components/vault/SpaceCard";
import { getVaultSummary } from "@/services/vaultService";

type Props = {
  searchParams?: {
    error?: string;
  };
};

export default async function SpacesPage({ searchParams }: Props) {
  const { spaces, plan } = await getVaultSummary();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Spaces</h1>
      <p className="mt-3 text-steel">
        Spaces organize high-level knowledge domains like Engineering, Legal, or Learning.
      </p>
      {searchParams?.error ? (
        <div className="mt-6 rounded-[1.5rem] bg-white/80 p-4 text-sm text-amber shadow-vault dark:bg-neutral-900/80">
          {searchParams.error === "spaces"
            ? `You reached the ${plan.name} space limit. Upgrade your plan to create more spaces.`
            : "This action is limited by your current plan."}
        </div>
      ) : null}
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
