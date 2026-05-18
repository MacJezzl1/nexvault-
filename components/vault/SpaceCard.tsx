type Props = {
  name: string;
  description: string;
};

export function SpaceCard({ name, description }: Props) {
  return (
    <article className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="mt-3 text-sm leading-6 text-steel">{description}</p>
    </article>
  );
}
