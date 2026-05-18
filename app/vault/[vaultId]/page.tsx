import { getVaultSummary } from "@/services/vaultService";

type Props = {
  params: { vaultId: string };
};

export default async function VaultDetailPage({ params }: Props) {
  const { vault, spaces, insights } = await getVaultSummary();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Vault {params.vaultId}</h1>
      <p className="mt-3 text-steel">
        {vault.name} currently has {spaces.length} spaces and {insights.length} active insight signals.
      </p>
    </main>
  );
}
