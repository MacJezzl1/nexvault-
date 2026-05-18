type Props = {
  sourceType: string;
  trustLevel: string;
  sensitivity: string;
  createdAt: string;
  source?: string;
};

export function MetadataPanel({ sourceType, trustLevel, sensitivity, createdAt, source }: Props) {
  return (
    <aside className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Metadata</p>
      <div className="mt-4 space-y-2 text-sm text-steel">
        <p>Language: English</p>
        <p>Source type: {sourceType}</p>
        <p>Trust: {trustLevel}</p>
        <p>Sensitivity: {sensitivity}</p>
        <p>Origin: {source ?? "Direct vault capture"}</p>
        <p>Created: {createdAt}</p>
      </div>
    </aside>
  );
}
