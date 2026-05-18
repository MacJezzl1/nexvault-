import { AskVaultChat } from "@/components/ai/AskVaultChat";

export default function AskPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Ask Vault</h1>
      <p className="mt-3 text-steel">
        Retrieval-augmented chat with explicit source citations and permission filters.
      </p>
      <div className="mt-8">
        <AskVaultChat />
      </div>
    </main>
  );
}
