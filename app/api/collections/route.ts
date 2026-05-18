import { NextResponse } from "next/server";
import { getVaultSummary } from "@/services/vaultService";

export async function GET() {
  const { collections } = await getVaultSummary();
  return NextResponse.json({ ok: true, collections });
}

export async function POST() {
  return NextResponse.json({ ok: true, resource: "collections" });
}
