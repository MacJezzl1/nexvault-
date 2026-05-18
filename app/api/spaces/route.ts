import { NextResponse } from "next/server";
import { getVaultSummary } from "@/services/vaultService";

export async function GET() {
  const { spaces } = await getVaultSummary();
  return NextResponse.json({ ok: true, spaces });
}

export async function POST() {
  return NextResponse.json({ ok: true, resource: "spaces" });
}
