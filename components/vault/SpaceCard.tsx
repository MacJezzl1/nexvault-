type Props = {
  id?: string;
  name: string;
  description: string;
  pinned?: boolean;
  stale?: boolean;
};

export function SpaceCard({ id, name, description, pinned, stale }: Props) {
  return (
    <article className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <div className="flex gap-2 text-xs">
          {pinned ? <span className="rounded-full bg-sand px-2 py-1">Pinned</span> : null}
          {stale ? <span className="rounded-full bg-amber px-2 py-1 text-sand">Stale</span> : null}
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-steel">{description}</p>
      {id ? (
        <a href={`/spaces/${id}`} className="mt-4 inline-block text-sm font-medium text-amber">
          Open space
        </a>
      ) : null}
    </article>
  );
}
