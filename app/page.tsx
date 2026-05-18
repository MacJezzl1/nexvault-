import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

const features = [
  "Upload notes, PDFs, and screenshots into one private vault.",
  "Ask questions over your knowledge with source citations.",
  "Separate personal memory from team memory without rebuilding."
];

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12">
      <header className="mb-20 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-steel">NEXVAULT</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight">
            Private AI memory for people, teams, and companies.
          </h1>
        </div>
        <Link
          href={user ? "/dashboard" : "/auth/sign-in"}
          className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-sand"
        >
          {user ? "Open Vault" : "Sign in"}
        </Link>
      </header>

      <section className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] border border-black/5 bg-white/70 p-8 shadow-vault backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber">Mission</p>
          <p className="mt-4 text-2xl leading-relaxed">
            Turn scattered information into private, useful intelligence.
          </p>
          <div className="mt-10 grid gap-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-black/5 bg-sand/70 px-4 py-4 text-sm text-steel"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-ink p-8 text-sand shadow-vault">
          <p className="text-sm uppercase tracking-[0.3em] text-sand/60">Core loop</p>
          <ol className="mt-6 space-y-4 text-lg">
            <li>1. Capture</li>
            <li>2. Process</li>
            <li>3. Organize</li>
            <li>4. Retrieve</li>
            <li>5. Ask</li>
            <li>6. Cite</li>
          </ol>
          <p className="mt-10 text-sm text-sand/70">
            Built to prove one thing first: a user uploads important information,
            asks a question, and gets a useful answer with sources.
          </p>
          {!user ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth/sign-in" className="rounded-full bg-sand px-4 py-2 text-sm text-ink">
                Sign in
              </Link>
              <Link href="/auth/sign-up" className="rounded-full border border-sand/30 px-4 py-2 text-sm">
                Create account
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
