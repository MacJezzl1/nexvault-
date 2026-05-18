type Props = {
  id: string;
  title: string;
  excerpt: string;
  spaceName: string;
  score: number;
  matchedTerms: string[];
};

export function SearchResultCard({ id, title, excerpt, spaceName, score, matchedTerms }: Props) {
  return (
    <article className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-steel">{excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-steel">
        <span className="rounded-full bg-sand px-2 py-1">{spaceName}</span>
        <span className="rounded-full bg-sand px-2 py-1">Score {score}</span>
        {matchedTerms.map((term) => (
          <span key={term} className="rounded-full bg-sand px-2 py-1">
            {term}
          </span>
        ))}
      </div>
      <a href={`/items/${id}`} className="mt-4 inline-block text-sm font-medium text-amber">
        Open source
      </a>
    </article>
  );
}
