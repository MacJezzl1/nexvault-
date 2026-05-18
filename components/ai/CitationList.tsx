type Props = {
  citations: Array<{
    itemId: string;
    title: string;
    quote: string;
    spaceName: string;
    itemType: string;
  }>;
};

export function CitationList({ citations }: Props) {
  return (
    <div className="mt-6">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Sources</p>
      <div className="mt-3 grid gap-3">
        {citations.map((citation) => (
          <a
            key={citation.itemId}
            href={`/items/${citation.itemId}`}
            className="rounded-2xl border border-black/10 bg-sand px-4 py-3 text-sm"
          >
            <div className="flex flex-wrap gap-2 text-xs text-steel">
              <span className="rounded-full bg-white px-2 py-1">{citation.spaceName}</span>
              <span className="rounded-full bg-white px-2 py-1">{citation.itemType}</span>
            </div>
            <strong className="mt-3 block">{citation.title}</strong>
            <p className="mt-1 text-steel">{citation.quote}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
