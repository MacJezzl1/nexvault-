import { formatDate } from "@/lib/utils";
import { listTimelineEvents } from "@/services/timelineService";

export default async function TimelinePage() {
  const events = await listTimelineEvents();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Timeline</h1>
      <p className="mt-3 text-steel">
        Added items, extracted decisions, and project updates should render in chronological order.
      </p>
      <div className="mt-8 space-y-4">
        {events.map((event) => (
          <article key={event.id} className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <span className="text-sm text-steel">{formatDate(event.date)}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-steel">{event.description}</p>
            {event.itemId ? (
              <a href={`/items/${event.itemId}`} className="mt-4 inline-block text-sm font-medium text-amber">
                Open source item
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}
