const citations = [
  "Q1 onboarding retrospective",
  "Customer activation meeting notes",
  "MVP product brief"
];

export function CitationList() {
  return (
    <div className="mt-6">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Sources</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {citations.map((citation) => (
          <span
            key={citation}
            className="rounded-full border border-black/10 bg-sand px-3 py-2 text-sm"
          >
            {citation}
          </span>
        ))}
      </div>
    </div>
  );
}
