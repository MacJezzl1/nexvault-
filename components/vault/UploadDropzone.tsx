type SpaceOption = {
  id: string;
  name: string;
};

type CollectionOption = {
  id: string;
  name: string;
};

type Props = {
  action: (formData: FormData) => Promise<void>;
  spaces: SpaceOption[];
  collections: CollectionOption[];
};

export function UploadDropzone({ action, spaces, collections }: Props) {
  return (
    <form action={action} className="rounded-[1.5rem] border border-dashed border-black/15 bg-white/60 p-6 text-sm text-steel">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Quick capture</p>
      <div className="mt-4 grid gap-4">
        <input
          name="title"
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"
          placeholder="Note title"
          required
        />
        <select
          name="spaceId"
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"
          required
        >
          {spaces.map((space) => (
            <option key={space.id} value={space.id}>
              {space.name}
            </option>
          ))}
        </select>
        <select
          name="collectionId"
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"
        >
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
        <select
          name="type"
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"
          defaultValue="note"
        >
          <option value="note">Note</option>
          <option value="pdf">PDF import</option>
          <option value="image">Image / screenshot</option>
          <option value="meeting_note">Meeting note</option>
          <option value="decision_record">Decision record</option>
        </select>
        <input
          name="source"
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"
          placeholder="Source URL or origin label (optional)"
        />
        <textarea
          name="content"
          className="min-h-[180px] rounded-[1.5rem] border border-black/10 bg-white px-4 py-3 outline-none"
          placeholder="Paste text, meeting notes, or imported content."
          required
        />
        <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-sand">
          Save to vault
        </button>
      </div>
    </form>
  );
}
