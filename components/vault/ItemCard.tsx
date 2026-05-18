type Props = {
  title: string;
  type: string;
};

export function ItemCard({ title, type }: Props) {
  return (
    <article className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <p className="text-xs uppercase tracking-[0.2em] text-steel">{type}</p>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
    </article>
  );
}
