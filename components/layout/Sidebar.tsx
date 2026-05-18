import Link from "next/link";
import { signOutAction } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth";
import { getThemeFromCookies } from "@/lib/theme";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

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
  const theme = getThemeFromCookies();

  return (
    <aside className="border-r border-black/5 bg-white/50 p-6 backdrop-blur dark:border-white/10 dark:bg-neutral-950/50">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">NEXVAULT</p>
      {user ? (
        <div className="mt-6 rounded-2xl bg-sand/80 px-4 py-3 text-sm text-steel dark:bg-neutral-900 dark:text-neutral-300">
          <p className="font-medium text-ink">{user.name}</p>
          <p className="mt-1 text-xs">{user.email}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em]">{user.plan} plan</p>
        </div>
      ) : null}
      <nav className="mt-8 space-y-2">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block rounded-2xl px-4 py-3 text-sm text-steel transition hover:bg-sand hover:text-ink dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
          >
            {label}
          </Link>
        ))}
        <Link
          href="/pricing"
          className="block rounded-2xl px-4 py-3 text-sm text-steel transition hover:bg-sand hover:text-ink dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
        >
          Pricing
        </Link>
      </nav>
      <div className="mt-8">
        <ThemeToggle theme={theme} returnTo="/dashboard" />
      </div>
      {user ? (
        <form action={signOutAction} className="mt-8">
          <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-sand dark:bg-sand dark:text-ink">
            Sign out
          </button>
        </form>
      ) : null}
    </aside>
  );
}
