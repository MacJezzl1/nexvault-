type FilterOption = {
  value: string;
  label: string;
};

type Props = {
  action?: string;
  query?: string;
  current?: {
    spaceId?: string;
    type?: string;
    tag?: string;
    trustLevel?: string;
    sensitivity?: string;
  };
  spaces: FilterOption[];
  tags: FilterOption[];
};

const typeOptions: FilterOption[] = [
  { value: "", label: "All item types" },
  { value: "note", label: "Notes" },
  { value: "pdf", label: "PDFs" },
  { value: "image", label: "Images" },
  { value: "meeting_note", label: "Meeting notes" },
  { value: "decision_record", label: "Decision records" }
];

const trustOptions: FilterOption[] = [
  { value: "", label: "Any trust level" },
  { value: "official", label: "Official" },
  { value: "draft", label: "Draft" },
  { value: "personal_note", label: "Personal note" },
  { value: "imported", label: "Imported" }
];

const sensitivityOptions: FilterOption[] = [
  { value: "", label: "Any sensitivity" },
  { value: "normal", label: "Normal" },
  { value: "financial", label: "Financial" },
  { value: "contract", label: "Contract" },
  { value: "product", label: "Product" }
];

function Select({
  name,
  label,
  options,
  defaultValue
}: {
  name: string;
  label: string;
  options: FilterOption[];
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-steel">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="mt-2 w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 text-sm outline-none"
      >
        {options.map((option) => (
          <option key={option.value || option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SearchFilters({ action = "/search", query = "", current, spaces, tags }: Props) {
  return (
    <aside className="rounded-[2rem] bg-white/80 p-6 shadow-vault">
      <form action={action} className="space-y-4">
        <input type="hidden" name="q" value={query} />
        <p className="text-sm uppercase tracking-[0.3em] text-steel">Filters</p>
        <Select
          name="spaceId"
          label="Space"
          defaultValue={current?.spaceId}
          options={[{ value: "", label: "All spaces" }, ...spaces]}
        />
        <Select name="type" label="Item type" defaultValue={current?.type} options={typeOptions} />
        <Select name="tag" label="Tag" defaultValue={current?.tag} options={[{ value: "", label: "Any tag" }, ...tags]} />
        <Select
          name="trustLevel"
          label="Trust"
          defaultValue={current?.trustLevel}
          options={trustOptions}
        />
        <Select
          name="sensitivity"
          label="Sensitivity"
          defaultValue={current?.sensitivity}
          options={sensitivityOptions}
        />
        <div className="flex gap-3">
          <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-sand">
            Apply
          </button>
          <a href={action} className="rounded-full bg-sand px-4 py-2 text-sm">
            Reset
          </a>
        </div>
      </form>
    </aside>
  );
}
