export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Settings</h1>
      <p className="mt-3 text-steel">Personal profile, export/delete controls, model settings, and storage config belong here.</p>
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
        </section>
      </div>
    </main>
  );
}
