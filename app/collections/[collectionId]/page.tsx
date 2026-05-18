type Props = {
  params: { collectionId: string };
};

export default function CollectionPage({ params }: Props) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Collection {params.collectionId}</h1>
      <p className="mt-3 text-steel">
        Use this page for list views, bulk actions, summaries, and export.
      </p>
    </main>
  );
}
