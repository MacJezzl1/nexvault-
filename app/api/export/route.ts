import { NextResponse } from "next/server";
import { exportVaultState } from "@/lib/vault-store";

export async function GET() {
  const state = await exportVaultState();

  return new NextResponse(JSON.stringify(state, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "content-disposition": 'attachment; filename="nexvault-export.json"'
    }
  });
}
