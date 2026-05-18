type Props = {
  params: { spaceId: string };
};

export default function SpaceDetailPage({ params }: Props) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Space {params.spaceId}</h1>
      <p className="mt-3 text-steel">
        Collections, smart folders, pinned documents, and item activity belong here.
      </p>
    </main>
  );
}
