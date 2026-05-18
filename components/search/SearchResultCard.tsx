type Props = {
  title: string;
  excerpt: string;
};

export function SearchResultCard({ title, excerpt }: Props) {
  return (
    <article className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-steel">{excerpt}</p>
    </article>
  );
}
