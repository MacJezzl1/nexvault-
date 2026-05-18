type Props = {
  title: string;
  description: string;
  actionLabel: string;
  action: (formData: FormData) => Promise<void>;
  mode: "sign-in" | "sign-up";
  error?: string;
};

const errorMessages: Record<string, string> = {
  missing: "Enter both email and password.",
  invalid: "That email or password does not match a local account.",
  exists: "That email is already registered.",
  invalid_signup: "Use a name, a valid email, and a password with at least 8 characters."
};

export function AuthCard({ title, description, actionLabel, action, mode, error }: Props) {
  return (
    <section className="w-full rounded-[2rem] bg-white/80 p-8 shadow-vault">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-steel">{description}</p>
      <form action={action} className="mt-8 space-y-4">
        {mode === "sign-up" ? (
          <input
            name="name"
            className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none"
            placeholder="Full name"
            required
          />
        ) : null}
        <input
          name="email"
          type="email"
          className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none"
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none"
          placeholder={mode === "sign-up" ? "Password (min 8 characters)" : "Password"}
          required
        />
        {error ? <p className="text-sm text-amber">{errorMessages[error] ?? error}</p> : null}
        <button type="submit" className="rounded-full bg-ink px-5 py-3 text-sm text-sand">
          {actionLabel}
        </button>
      </form>
      <p className="mt-6 text-xs leading-6 text-steel">
        Demo account: <strong>founder@nexvault.local</strong> with password <strong>demo1234</strong>
      </p>
    </section>
  );
}
