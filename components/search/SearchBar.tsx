type Props = {
  query?: string;
};

export function SearchBar({ query = "" }: Props) {
  return (
    <form action="/search" className="rounded-[2rem] bg-white/80 p-6 shadow-vault">
      <label className="text-sm uppercase tracking-[0.3em] text-steel" htmlFor="search">
        Search vault
      </label>
      <input
        id="search"
        name="q"
        defaultValue={query}
        className="mt-4 w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none"
        placeholder="Search by concept, tag, file name, or decision"
      />
      <button type="submit" className="mt-4 rounded-full bg-ink px-4 py-2 text-sm text-sand">
        Search
      </button>
    </form>
  );
}
