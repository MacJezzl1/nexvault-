type Props = {
  query?: string;
  scope?: {
    spaceId?: string;
    type?: string;
    tag?: string;
    trustLevel?: string;
    sensitivity?: string;
  };
};

export function SearchBar({ query = "", scope }: Props) {
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
      <input type="hidden" name="spaceId" value={scope?.spaceId ?? ""} />
      <input type="hidden" name="type" value={scope?.type ?? ""} />
      <input type="hidden" name="tag" value={scope?.tag ?? ""} />
      <input type="hidden" name="trustLevel" value={scope?.trustLevel ?? ""} />
      <input type="hidden" name="sensitivity" value={scope?.sensitivity ?? ""} />
      <button type="submit" className="mt-4 rounded-full bg-ink px-4 py-2 text-sm text-sand">
        Search
      </button>
    </form>
  );
}
