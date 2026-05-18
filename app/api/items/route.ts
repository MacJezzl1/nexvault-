import { NextResponse } from "next/server";
import { listItems } from "@/services/itemService";

export async function GET() {
  return NextResponse.json({ ok: true, items: await listItems() });
}

export async function POST() {
  return NextResponse.json({ ok: true, resource: "items" });
}
