import Link from "next/link";
import { signOutAction } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth";

const links = [
  ["Home", "/dashboard"],
  ["Inbox", "/spaces"],
  ["Ask Vault", "/ask"],
  ["Search", "/search"],
  ["Timeline", "/timeline"],
  ["Insights", "/insights"],
  ["Settings", "/settings"]
];

export async function Sidebar() {
  const user = await getCurrentUser();

  return (
    <aside className="border-r border-black/5 bg-white/50 p-6 backdrop-blur">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">NEXVAULT</p>
      {user ? (
        <div className="mt-6 rounded-2xl bg-sand/80 px-4 py-3 text-sm text-steel">
          <p className="font-medium text-ink">{user.name}</p>
          <p className="mt-1 text-xs">{user.email}</p>
        </div>
      ) : null}
      <nav className="mt-8 space-y-2">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block rounded-2xl px-4 py-3 text-sm text-steel transition hover:bg-sand hover:text-ink"
          >
            {label}
          </Link>
        ))}
      </nav>
      {user ? (
        <form action={signOutAction} className="mt-8">
          <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-sand">
            Sign out
          </button>
        </form>
      ) : null}
    </aside>
  );
}
