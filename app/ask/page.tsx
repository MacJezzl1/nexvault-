import { AskVaultChat } from "@/components/ai/AskVaultChat";
import { suggestedQuestions } from "@/lib/mock-data";
import { askVault } from "@/services/aiService";

type Props = {
  searchParams?: {
    q?: string;
  };
};

export default async function AskPage({ searchParams }: Props) {
  const query = searchParams?.q ?? suggestedQuestions[0];
  const result = await askVault(query);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Ask Vault</h1>
      <p className="mt-3 text-steel">
        Retrieval-augmented chat with explicit source citations and permission filters.
      </p>
      <div className="mt-8">
        <AskVaultChat
          query={result.query}
          answer={result.answer}
          confidence={result.confidence}
          citations={result.citations}
          followUps={result.followUps}
        />
      </div>
    </main>
  );
}
