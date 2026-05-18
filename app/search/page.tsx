import { SearchBar } from "@/components/search/SearchBar";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { searchVault } from "@/services/searchService";
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

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams?.q ?? "";
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
  const [results, summary] = await Promise.all([searchVault(scope), getVaultSummary()]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Search</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <SearchBar query={query} scope={scope} />
          <section className="rounded-[2rem] bg-white/80 p-6 shadow-vault">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm uppercase tracking-[0.3em] text-steel">Results</p>
              <p className="text-sm text-steel">
                {results.results.length} result{results.results.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="mt-4 grid gap-4">
              {results.results.map((result) => (
                <SearchResultCard
                  key={result.itemId}
                  id={result.itemId}
                  title={result.title}
                  excerpt={result.excerpt}
                  spaceName={result.spaceName}
                  score={result.score}
                  matchedTerms={result.matchedTerms}
                  type={result.type}
                  trustLevel={result.trustLevel}
                  sensitivity={result.sensitivity}
                  updatedLabel={result.updatedLabel}
                />
              ))}
            </div>
          </section>
        </div>
        <SearchFilters
          query={query}
          current={scope}
          spaces={summary.spaces.map((space) => ({ value: space.id, label: space.name }))}
          tags={summary.tags.map((tag) => ({ value: tag.name, label: tag.name }))}
        />
      </div>
    </main>
  );
}
