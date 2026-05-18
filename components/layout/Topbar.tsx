import { getCurrentUser } from "@/lib/auth";

type Props = {
  title: string;
  description: string;
};

export async function Topbar({ title, description }: Props) {
  const user = await getCurrentUser();

  return (
    <header className="flex items-center justify-between rounded-[1.5rem] bg-white/80 px-5 py-4 shadow-vault dark:bg-neutral-900/80">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-steel">Vault overview</p>
        <h2 className="mt-1 text-xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-steel">{description}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-ink">{user?.name ?? "Guest"}</p>
        <p className="mt-1 text-xs text-steel">{user?.email ?? "No session"}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-steel">
          {user?.plan ?? "free"} plan
        </p>
      </div>
    </header>
  );
}
