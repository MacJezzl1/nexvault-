const tags = ["Research", "Decision", "Sensitive", "Contract"];

export function TagPicker() {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button key={tag} type="button" className="rounded-full bg-sand px-3 py-2 text-sm">
          {tag}
        </button>
      ))}
    </div>
  );
}
