const nodes = ["Architecture", "Postmortems", "API Documentation"];

export function CollectionTree() {
  return (
    <div className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Collections</p>
      <ul className="mt-4 space-y-3 text-sm text-steel">
        {nodes.map((node) => (
          <li key={node}>{node}</li>
        ))}
      </ul>
    </div>
  );
}
