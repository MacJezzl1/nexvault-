import { NextResponse } from "next/server";
import { getVaultSummary } from "@/services/vaultService";

export async function GET() {
  return NextResponse.json({ ok: true, ...(await getVaultSummary()) });
}

export async function POST() {
  return NextResponse.json({ ok: true, resource: "vaults" });
}
