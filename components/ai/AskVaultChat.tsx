import { CitationList } from "@/components/ai/CitationList";
import { SuggestedQuestions } from "@/components/ai/SuggestedQuestions";

export function AskVaultChat() {
  return (
    <section className="rounded-[2rem] bg-white/80 p-6 shadow-vault">
      <div className="rounded-2xl border border-black/5 bg-sand/60 p-4">
        <p className="text-sm uppercase tracking-[0.3em] text-steel">Query</p>
        <p className="mt-3 text-lg">What did the team decide about customer onboarding?</p>
      </div>
      <div className="mt-4 rounded-2xl border border-black/5 bg-white p-4">
        <p className="text-sm uppercase tracking-[0.3em] text-steel">Answer</p>
        <p className="mt-3 leading-7 text-steel">
          The system should answer only from retrieved chunks, include confidence,
          and link each claim back to its source item.
        </p>
      </div>
      <CitationList />
      <SuggestedQuestions />
    </section>
  );
}
