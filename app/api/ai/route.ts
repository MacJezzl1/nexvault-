import { NextResponse } from "next/server";
import { askVault } from "@/services/aiService";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { q?: string };
  return NextResponse.json(await askVault(body.q));
}
