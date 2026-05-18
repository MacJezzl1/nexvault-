import { NextResponse } from "next/server";
import { demoTimeline } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ ok: true, audit: demoTimeline });
}
