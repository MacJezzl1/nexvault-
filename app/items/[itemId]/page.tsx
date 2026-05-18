import { deleteItemAction } from "@/app/actions";
import { MetadataPanel } from "@/components/editor/MetadataPanel";
import { TagPicker } from "@/components/editor/TagPicker";
import { ItemCard } from "@/components/vault/ItemCard";
import { formatDate } from "@/lib/utils";
import { getItemDetail } from "@/services/itemService";

type Props = {
  params: { itemId: string };
};

export default async function ItemPage({ params }: Props) {
  const detail = await getItemDetail(params.itemId);

  if (!detail) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-4xl font-semibold">Item not found</h1>
      </main>
    );
  }

  const { item, relatedItems } = detail;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">{item.title}</h1>
      <p className="mt-3 text-steel">{item.summary}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] bg-white/80 p-6 shadow-vault">
          <div className="flex flex-wrap gap-2 text-xs text-steel">
            <span className="rounded-full bg-sand px-2 py-1">{item.type}</span>
            <span className="rounded-full bg-sand px-2 py-1">{item.trustLevel}</span>
            <span className="rounded-full bg-sand px-2 py-1">
              Updated {formatDate(item.updatedAt)}
            </span>
          </div>
          <p className="mt-6 whitespace-pre-wrap leading-7 text-steel">{item.content}</p>
        </section>
        <div className="space-y-6">
          <MetadataPanel
            sourceType={item.type}
            trustLevel={item.trustLevel}
            sensitivity={item.sensitivity}
            createdAt={formatDate(item.createdAt)}
          />
          <form action={deleteItemAction} className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
            <input type="hidden" name="itemId" value={item.id} />
            <input type="hidden" name="spaceId" value={item.spaceId} />
            <p className="text-sm uppercase tracking-[0.3em] text-steel">Danger zone</p>
            <p className="mt-3 text-sm leading-6 text-steel">
              Remove this item from the local vault store.
            </p>
            <button type="submit" className="mt-4 rounded-full bg-amber px-4 py-2 text-sm text-sand">
              Delete item
            </button>
          </form>
          <section className="rounded-[1.5rem] bg-white/80 p-5 shadow-vault">
            <p className="text-sm uppercase tracking-[0.3em] text-steel">Tags</p>
            <div className="mt-4">
              <TagPicker tags={item.tags} />
            </div>
          </section>
        </div>
      </div>
      <section className="mt-8 rounded-[2rem] bg-white/80 p-6 shadow-vault">
        <p className="text-sm uppercase tracking-[0.3em] text-steel">Related items</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {relatedItems.map((relatedItem) => (
            <ItemCard
              key={relatedItem.id}
              id={relatedItem.id}
              title={relatedItem.title}
              type={relatedItem.type}
              summary={relatedItem.summary}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
