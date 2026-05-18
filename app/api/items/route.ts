import { NextResponse } from "next/server";
import { UsageLimitError } from "@/lib/entitlements";
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

  try {
    const item = await createNote({
      title: body.title,
      content: body.content,
      spaceId: body.spaceId,
      collectionId: body.collectionId,
      type: body.type,
      source: body.source
    });
    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    if (error instanceof UsageLimitError) {
      return NextResponse.json(
        { ok: false, message: `Plan limit reached for ${error.code}.`, limit: error.limit },
        { status: 403 }
      );
    }

    throw error;
  }
}
