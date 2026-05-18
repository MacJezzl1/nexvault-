type SpaceOption = {
  id: string;
  name: string;
};

type Props = {
  action: (formData: FormData) => Promise<void>;
  spaces: SpaceOption[];
  defaultSpaceId?: string;
};

export function CollectionCreateForm({ action, spaces, defaultSpaceId }: Props) {
  return (
    <form action={action} className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Create collection</p>
      <div className="mt-4 grid gap-3">
        <select
          name="spaceId"
          defaultValue={defaultSpaceId ?? spaces[0]?.id}
          className="rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none"
          required
        >
          {spaces.map((space) => (
            <option key={space.id} value={space.id}>
              {space.name}
            </option>
          ))}
        </select>
        <input
          name="name"
          className="rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none"
          placeholder="Collection name"
          required
        />
        <textarea
          name="description"
          className="min-h-[120px] rounded-[1.5rem] border border-black/10 bg-sand px-4 py-3 outline-none"
          placeholder="What belongs in this collection?"
          required
        />
        <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-sand">
          Create collection
        </button>
      </div>
    </form>
  );
}
