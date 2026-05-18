import { SearchBar } from "@/components/search/SearchBar";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { searchVault } from "@/services/searchService";

type Props = {
  searchParams?: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams?.q ?? "";
  const results = await searchVault(query);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Search</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <SearchBar query={query} />
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
                  excerpt={result.summary}
                  spaceName={result.spaceName}
                  score={result.score}
                  matchedTerms={result.matchedTerms}
                />
              ))}
            </div>
          </section>
        </div>
        <SearchFilters />
      </div>
    </main>
  );
}
