import { SearchBar } from "@/components/search/SearchBar";
import { SearchFilters } from "@/components/search/SearchFilters";

export default function SearchPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Search</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
        <SearchBar />
        <SearchFilters />
      </div>
    </main>
  );
}
