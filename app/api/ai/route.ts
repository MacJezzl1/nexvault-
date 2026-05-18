import { NextResponse } from "next/server";
import { askVault } from "@/services/aiService";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    q?: string;
    spaceId?: string;
    type?: string;
    tag?: string;
    trustLevel?: string;
    sensitivity?: string;
  };
  return NextResponse.json(
    await askVault({
      query: body.q,
      spaceId: body.spaceId,
      type: body.type as
        | "note"
        | "pdf"
        | "image"
        | "decision_record"
        | "meeting_note"
        | undefined,
      tag: body.tag,
      trustLevel: body.trustLevel as "official" | "draft" | "personal_note" | "imported" | undefined,
      sensitivity: body.sensitivity as "normal" | "financial" | "contract" | "product" | undefined
    })
  );
}
