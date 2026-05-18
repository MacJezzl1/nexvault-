const prompts = [
  "Show only official sources",
  "Summarize this into action items",
  "What changed since last month?"
];

export function SuggestedQuestions() {
  return (
    <div className="mt-6">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Follow-ups</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {prompts.map((prompt) => (
          <button
            type="button"
            key={prompt}
            className="rounded-full bg-ink px-4 py-2 text-sm text-sand"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
