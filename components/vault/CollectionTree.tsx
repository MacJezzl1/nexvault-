type Node = {
  id: string;
  name: string;
};

type Props = {
  collections: Node[];
};

export function CollectionTree({ collections }: Props) {
  return (
    <div className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Collections</p>
      <ul className="mt-4 space-y-3 text-sm text-steel">
        {collections.map((node) => (
          <li key={node.id}>
            <a href={`/collections/${node.id}`}>{node.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
