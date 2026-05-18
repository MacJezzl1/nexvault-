import Link from "next/link";

const links = [
  ["Home", "/dashboard"],
  ["Inbox", "/spaces"],
  ["Ask Vault", "/ask"],
  ["Search", "/search"],
  ["Timeline", "/timeline"],
  ["Insights", "/insights"],
  ["Settings", "/settings"]
];

export function Sidebar() {
  return (
    <aside className="border-r border-black/5 bg-white/50 p-6 backdrop-blur">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">NEXVAULT</p>
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
    </aside>
  );
}
