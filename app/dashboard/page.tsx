import { Sidebar } from "@/components/layout/Sidebar";
import { VaultCard } from "@/components/vault/VaultCard";
import { SpaceCard } from "@/components/vault/SpaceCard";

const spaces = [
  { name: "Inbox", description: "Unsorted uploads and quick capture." },
  { name: "Projects", description: "Active work, plans, and decision notes." },
  { name: "Learning", description: "Research, PDFs, and study guides." }
];

export default function DashboardPage() {
  return (
    <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
      <Sidebar />
      <main className="p-8">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <VaultCard />
          <section className="rounded-[2rem] bg-white/75 p-6 shadow-vault">
            <p className="text-sm uppercase tracking-[0.3em] text-steel">Ask Vault</p>
            <h2 className="mt-4 text-2xl font-semibold">
              What decisions did I make about the onboarding flow?
            </h2>
            <p className="mt-4 text-sm leading-6 text-steel">
              Build the chat answer panel here with citations, confidence, and
              source cards.
            </p>
          </section>
        </div>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Pinned spaces</h2>
            <p className="text-sm text-steel">Recent, suggested, and stale knowledge live here.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {spaces.map((space) => (
              <SpaceCard key={space.name} {...space} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
