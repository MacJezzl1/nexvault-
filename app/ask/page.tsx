import { AskVaultChat } from "@/components/ai/AskVaultChat";
import { SearchFilters } from "@/components/search/SearchFilters";
import { suggestedQuestions } from "@/lib/mock-data";
import { askVault } from "@/services/aiService";
import { getVaultSummary } from "@/services/vaultService";

type Props = {
  searchParams?: {
    q?: string;
    spaceId?: string;
    type?: string;
    tag?: string;
    trustLevel?: string;
    sensitivity?: string;
  };
};

export default async function AskPage({ searchParams }: Props) {
  const query = searchParams?.q ?? suggestedQuestions[0];
  const scope = {
    query,
    spaceId: searchParams?.spaceId || undefined,
    type: searchParams?.type as
      | "note"
      | "pdf"
      | "image"
      | "decision_record"
      | "meeting_note"
      | undefined,
    tag: searchParams?.tag || undefined,
    trustLevel: searchParams?.trustLevel as
      | "official"
      | "draft"
      | "personal_note"
      | "imported"
      | undefined,
    sensitivity: searchParams?.sensitivity as
      | "normal"
      | "financial"
      | "contract"
      | "product"
      | undefined
  };
  const [result, summary] = await Promise.all([askVault(scope), getVaultSummary()]);
  const scopeQuery = [
    scope.spaceId ? `spaceId=${encodeURIComponent(scope.spaceId)}` : "",
    scope.type ? `type=${encodeURIComponent(scope.type)}` : "",
    scope.tag ? `tag=${encodeURIComponent(scope.tag)}` : "",
    scope.trustLevel ? `trustLevel=${encodeURIComponent(scope.trustLevel)}` : "",
    scope.sensitivity ? `sensitivity=${encodeURIComponent(scope.sensitivity)}` : ""
  ]
    .filter(Boolean)
    .join("&");

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Ask Vault</h1>
      <p className="mt-3 text-steel">
        Retrieval-augmented chat with explicit source citations and permission filters.
      </p>
      <form action="/ask" className="mt-8 rounded-[2rem] bg-white/80 p-6 shadow-vault">
        <label className="text-sm uppercase tracking-[0.3em] text-steel" htmlFor="ask-query">
          Question
        </label>
        <input
          id="ask-query"
          name="q"
          defaultValue={query}
          className="mt-4 w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none"
          placeholder="What do we know about onboarding risk?"
        />
        <button type="submit" className="mt-4 rounded-full bg-ink px-4 py-2 text-sm text-sand">
          Ask Vault
        </button>
      </form>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
        <AskVaultChat
          query={result.query}
          answer={result.answer}
          confidence={result.confidence}
          citations={result.citations}
          followUps={result.followUps}
          retrievalCount={result.retrievalCount}
          scopeQuery={scopeQuery ? `&${scopeQuery}` : ""}
        />
        <SearchFilters
          action="/ask"
          query={query}
          current={scope}
          spaces={summary.spaces.map((space) => ({ value: space.id, label: space.name }))}
          tags={summary.tags.map((tag) => ({ value: tag.name, label: tag.name }))}
        />
      </div>
    </main>
  );
}
