import {
  demoCollections,
  demoInsights,
  demoItems,
  demoSpaces,
  demoTimeline,
  demoVault
} from "@/lib/mock-data";

export async function createVault() {
  return { ok: true, vault: demoVault };
}

export async function getVaultSummary() {
  return {
    vault: demoVault,
    spaces: demoSpaces,
    collections: demoCollections,
    items: demoItems,
    insights: demoInsights,
    timeline: demoTimeline
  };
}
