import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { getThemeFromCookies } from "@/lib/theme";
import { getVaultSummary } from "@/services/vaultService";

export default async function SettingsPage() {
  const theme = getThemeFromCookies();
  const { plan, usage } = await getVaultSummary();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Settings</h1>
      <p className="mt-3 text-steel">
        Personal profile, export/delete controls, model settings, and storage config belong here.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
          <h2 className="text-xl font-semibold">Data controls</h2>
          <p className="mt-3 text-sm leading-6 text-steel">
            Export item data, delete vault content, and review sensitive document warnings.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/api/export" className="rounded-full bg-ink px-4 py-2 text-sm text-sand">
              Export vault JSON
            </a>
            <a href="/vault" className="rounded-full bg-sand px-4 py-2 text-sm">
              Review vault contents
            </a>
          </div>
        </section>
        <section className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
          <h2 className="text-xl font-semibold">AI behavior</h2>
          <p className="mt-3 text-sm leading-6 text-steel">
            Keep citations mandatory, restrict retrieval scope, and prefer safer model settings.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/ask" className="rounded-full bg-ink px-4 py-2 text-sm text-sand">
              Open Ask Vault
            </a>
            <a href="/search" className="rounded-full bg-sand px-4 py-2 text-sm">
              Review search filters
            </a>
          </div>
        </section>
        <section className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
          <h2 className="text-xl font-semibold">Theme</h2>
          <p className="mt-3 text-sm leading-6 text-steel">
            Switch between light and dark mode. The selection is stored locally in a cookie.
          </p>
          <div className="mt-4">
            <ThemeToggle theme={theme} returnTo="/settings" />
          </div>
        </section>
        <section className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
          <h2 className="text-xl font-semibold">Plan and limits</h2>
          <p className="mt-3 text-sm leading-6 text-steel">
            Current plan: {plan.name}. You are using {usage.items} items and {usage.spaces} spaces.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/pricing" className="rounded-full bg-ink px-4 py-2 text-sm text-sand">
              View pricing
            </a>
          </div>
        </section>
        <section className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
          <h2 className="text-xl font-semibold">Recommended retrieval policy</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-steel">
            <li>Private-by-default answers with citations only.</li>
            <li>Scope sensitive questions to a single space or tag before sharing results.</li>
            <li>Prefer official or draft sources before personal notes when reviewing decisions.</li>
          </ul>
        </section>
        <section className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
          <h2 className="text-xl font-semibold">Capture guidance</h2>
          <p className="mt-3 text-sm leading-6 text-steel">
            Add origin labels when importing text so trust level and sensitivity warnings remain
            meaningful in search and Ask Vault.
          </p>
        </section>
      </div>
    </main>
  );
}
