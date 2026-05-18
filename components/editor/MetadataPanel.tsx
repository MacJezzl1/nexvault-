export function MetadataPanel() {
  return (
    <aside className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Metadata</p>
      <div className="mt-4 space-y-2 text-sm text-steel">
        <p>Language: English</p>
        <p>Source type: PDF</p>
        <p>Trust: Draft</p>
      </div>
    </aside>
  );
}
