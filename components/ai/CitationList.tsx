type Props = {
  citations: Array<{
    itemId: string;
    title: string;
    quote: string;
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
            <strong>{citation.title}</strong>
            <p className="mt-1 text-steel">{citation.quote}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
