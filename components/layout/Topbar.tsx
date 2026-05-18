type Props = {
  title: string;
  description: string;
};

export function Topbar({ title, description }: Props) {
  return (
    <header className="flex items-center justify-between rounded-[1.5rem] bg-white/80 px-5 py-4 shadow-vault">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-steel">Vault overview</p>
        <h2 className="mt-1 text-xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-steel">{description}</p>
      </div>
      <button type="button" className="rounded-full bg-ink px-4 py-2 text-sm text-sand">
        Quick upload
      </button>
    </header>
  );
}
