import { createNoteAction } from "@/app/actions";
import { Topbar } from "@/components/layout/Topbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { requireUser } from "@/lib/auth";
import { ItemCard } from "@/components/vault/ItemCard";
import { SpaceCard } from "@/components/vault/SpaceCard";
import { UploadDropzone } from "@/components/vault/UploadDropzone";
import { VaultCard } from "@/components/vault/VaultCard";
import { suggestedQuestions } from "@/lib/mock-data";
import { getVaultSummary } from "@/services/vaultService";

export default async function DashboardPage() {
  await requireUser();
  const { vault, spaces, collections, items, insights } = await getVaultSummary();
  const pinnedSpaces = spaces.filter((space) => space.pinned);
  const staleSpaces = spaces.filter((space) => space.stale).length;

  return (
    <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
      <Sidebar />
      <main className="p-8">
        <Topbar
          title="Trusted memory with citations"
          description="A seeded prototype of upload, organize, search, ask, and cite."
        />
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <VaultCard
            name={vault.name}
            itemCount={items.length}
            insightCount={insights.length}
            staleCount={staleSpaces}
            healthScore={vault.healthScore}
          />
          <section className="rounded-[2rem] bg-white/75 p-6 shadow-vault">
            <p className="text-sm uppercase tracking-[0.3em] text-steel">Ask Vault</p>
            <h2 className="mt-4 text-2xl font-semibold">Suggested questions</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {suggestedQuestions.map((prompt) => (
                <a
                  key={prompt}
                  href={`/ask?q=${encodeURIComponent(prompt)}`}
                  className="rounded-full bg-ink px-4 py-2 text-sm text-sand"
                >
                  {prompt}
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-steel">{vault.weeklyDigest}</p>
          </section>
        </div>

        <section className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <UploadDropzone
            action={createNoteAction}
            spaces={spaces.map((space) => ({ id: space.id, name: space.name }))}
            collections={collections.map((collection) => ({
              id: collection.id,
              name: collection.name
            }))}
          />
          <section className="rounded-[2rem] bg-white/80 p-6 shadow-vault">
            <p className="text-sm uppercase tracking-[0.3em] text-steel">Recent items</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {items.slice(0, 4).map((item) => (
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
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Pinned spaces</h2>
            <p className="text-sm text-steel">Recent, suggested, and stale knowledge live here.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pinnedSpaces.map((space) => (
              <SpaceCard key={space.id} {...space} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
