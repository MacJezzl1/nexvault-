export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <section className="w-full rounded-[2rem] bg-white/80 p-8 shadow-vault">
        <h1 className="text-3xl font-semibold">Sign in</h1>
        <p className="mt-3 text-sm text-steel">
          Connect auth here. MVP should support email login and later SSO.
        </p>
      </section>
    </main>
  );
}
