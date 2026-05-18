import { NextResponse } from "next/server";
import { createNote } from "@/lib/vault-store";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        title?: string;
        content?: string;
        spaceId?: string;
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
    type: "note",
    source: "upload"
  });

  return NextResponse.json({ ok: true, item, processed: true }, { status: 201 });
}
