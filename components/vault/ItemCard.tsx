type Props = {
  id?: string;
  title: string;
  type: string;
  summary?: string;
};

export function ItemCard({ id, title, type, summary }: Props) {
  return (
    <article className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <p className="text-xs uppercase tracking-[0.2em] text-steel">{type}</p>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      {summary ? <p className="mt-2 text-sm leading-6 text-steel">{summary}</p> : null}
      {id ? (
        <a href={`/items/${id}`} className="mt-4 inline-block text-sm font-medium text-amber">
          Open item
        </a>
      ) : null}
    </article>
  );
}
