export function SearchBar() {
  return (
    <div className="rounded-[2rem] bg-white/80 p-6 shadow-vault">
      <label className="text-sm uppercase tracking-[0.3em] text-steel" htmlFor="search">
        Search vault
      </label>
      <input
        id="search"
        className="mt-4 w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none"
        placeholder="Search by concept, tag, file name, or decision"
      />
    </div>
  );
}
