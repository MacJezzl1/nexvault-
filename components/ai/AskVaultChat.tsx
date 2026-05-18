import { CitationList } from "@/components/ai/CitationList";
import { SuggestedQuestions } from "@/components/ai/SuggestedQuestions";

type Props = {
  query: string;
  answer: string;
  confidence: string;
  citations: Array<{
    itemId: string;
    title: string;
    quote: string;
    spaceName: string;
    itemType: string;
  }>;
  followUps: string[];
  retrievalCount: number;
  scopeQuery?: string;
  provider?: string;
  limitMessage?: string;
};

export function AskVaultChat({
  query,
  answer,
  confidence,
  citations,
  followUps,
  retrievalCount,
  scopeQuery,
  provider,
  limitMessage
}: Props) {
  return (
    <section className="rounded-[2rem] bg-white/80 p-6 shadow-vault">
      <div className="rounded-2xl border border-black/5 bg-sand/60 p-4">
        <p className="text-sm uppercase tracking-[0.3em] text-steel">Query</p>
        <p className="mt-3 text-lg">{query}</p>
      </div>
      <div className="mt-4 rounded-2xl border border-black/5 bg-white p-4">
        <div className="flex flex-wrap gap-2 text-xs text-steel">
          <span className="rounded-full bg-sand px-2 py-1">Confidence {confidence}</span>
          <span className="rounded-full bg-sand px-2 py-1">
            Retrieved {retrievalCount} source{retrievalCount === 1 ? "" : "s"}
          </span>
          <span className="rounded-full bg-sand px-2 py-1">
            Provider {provider ?? "heuristic"}
          </span>
        </div>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-steel">Answer</p>
        <p className="mt-3 leading-7 text-steel">{answer}</p>
        {limitMessage ? <p className="mt-4 text-sm text-amber">{limitMessage}</p> : null}
      </div>
      <CitationList citations={citations} />
      <SuggestedQuestions prompts={followUps} scopeQuery={scopeQuery} />
    </section>
  );
}
