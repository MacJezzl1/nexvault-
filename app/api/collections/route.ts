import { NextResponse } from "next/server";
import { createCollection } from "@/lib/vault-store";
import { getVaultSummary } from "@/services/vaultService";

export async function GET() {
  const { collections } = await getVaultSummary();
  return NextResponse.json({ ok: true, collections });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        spaceId?: string;
        name?: string;
        description?: string;
      }
    | null;

  if (!body?.spaceId || !body?.name || !body?.description) {
    return NextResponse.json(
      { ok: false, message: "spaceId, name, and description are required" },
      { status: 400 }
    );
  }

  const collection = await createCollection({
    spaceId: body.spaceId,
    name: body.name,
    description: body.description
  });
  return NextResponse.json({ ok: true, collection }, { status: 201 });
}
