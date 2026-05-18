import { NextResponse } from "next/server";
import { searchVault } from "@/services/searchService";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { q?: string };
  return NextResponse.json(await searchVault(body.q ?? ""));
}
