type Props = {
  prompts: string[];
  scopeQuery?: string;
};

export function SuggestedQuestions({ prompts, scopeQuery = "" }: Props) {
  return (
    <div className="mt-6">
      <p className="text-sm uppercase tracking-[0.3em] text-steel">Follow-ups</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {prompts.map((prompt) => (
          <a
            key={prompt}
            href={`/ask?q=${encodeURIComponent(prompt)}${scopeQuery}`}
            className="rounded-full bg-ink px-4 py-2 text-sm text-sand"
          >
            {prompt}
          </a>
        ))}
      </div>
    </div>
  );
}
