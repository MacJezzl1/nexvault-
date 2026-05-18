import { NextResponse } from "next/server";
import { createSpace } from "@/lib/vault-store";
import { getVaultSummary } from "@/services/vaultService";

export async function GET() {
  const { spaces } = await getVaultSummary();
  return NextResponse.json({ ok: true, spaces });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        name?: string;
        description?: string;
        pinned?: boolean;
      }
    | null;

  if (!body?.name || !body?.description) {
    return NextResponse.json(
      { ok: false, message: "name and description are required" },
      { status: 400 }
    );
  }

  const space = await createSpace({
    name: body.name,
    description: body.description,
    pinned: body.pinned
  });
  return NextResponse.json({ ok: true, space }, { status: 201 });
}
