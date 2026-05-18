import { NextResponse } from "next/server";
import { createNote } from "@/lib/vault-store";
import { listItems } from "@/services/itemService";

export async function GET() {
  return NextResponse.json({ ok: true, items: await listItems() });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        title?: string;
        content?: string;
        spaceId?: string;
        collectionId?: string;
        type?: "note" | "pdf" | "image" | "meeting_note" | "decision_record";
        source?: string;
      }
    | null;

  if (!body?.title || !body?.content || !body?.spaceId) {
    return NextResponse.json(
      { ok: false, message: "title, content, and spaceId are required" },
      { status: 400 }
    );
  }

  const item = await createNote({
    title: body.title,
    content: body.content,
    spaceId: body.spaceId,
    collectionId: body.collectionId,
    type: body.type,
    source: body.source
  });
  return NextResponse.json({ ok: true, item }, { status: 201 });
}
