type Props = {
  action: (formData: FormData) => Promise<void>;
};

export function SpaceCreateForm({ action }: Props) {
  return (
    <form action={action} className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Create space</p>
      <div className="mt-4 grid gap-3">
        <input
          name="name"
          className="rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none"
          placeholder="Space name"
          required
        />
        <textarea
          name="description"
          className="min-h-[120px] rounded-[1.5rem] border border-black/10 bg-sand px-4 py-3 outline-none"
          placeholder="What kind of knowledge belongs in this space?"
          required
        />
        <label className="flex items-center gap-2 text-sm text-steel">
          <input type="checkbox" name="pinned" />
          Pin on dashboard
        </label>
        <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-sand">
          Create space
        </button>
      </div>
    </form>
  );
}
