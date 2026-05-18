type Props = {
  params: { itemId: string };
};

export default function ItemPage({ params }: Props) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Item {params.itemId}</h1>
      <p className="mt-3 text-steel">
        Item preview, extracted text, summary, tags, permissions, and citations live here.
      </p>
    </main>
  );
}
