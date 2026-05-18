type Props = {
  params: { vaultId: string };
};

export default function VaultDetailPage({ params }: Props) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Vault {params.vaultId}</h1>
      <p className="mt-3 text-steel">
        Show storage, spaces, recent uploads, member roles, and AI activity.
      </p>
    </main>
  );
}
