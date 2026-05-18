const filters = ["Notes", "PDFs", "Meetings", "Decisions", "Last 30 days"];

export function SearchFilters() {
  return (
    <aside className="rounded-[2rem] bg-white/80 p-6 shadow-vault">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Filters</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <span key={filter} className="rounded-full bg-sand px-3 py-2 text-sm">
            {filter}
          </span>
        ))}
      </div>
    </aside>
  );
}
