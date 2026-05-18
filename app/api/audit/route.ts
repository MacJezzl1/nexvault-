import { NextResponse } from "next/server";
import { readVaultState } from "@/lib/vault-store";

export async function GET() {
  const state = await readVaultState();
  return NextResponse.json({ ok: true, audit: state.timeline });
}
