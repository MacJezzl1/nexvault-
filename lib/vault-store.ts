import { promises as fs } from "fs";
import path from "path";
import { ensureCanCreateItem, ensureCanCreateSpace } from "@/lib/entitlements";
import { defaultInsights, defaultVaultState } from "@/lib/mock-data";
import { processDocument } from "@/lib/document-processing";
import type {
  CollectionRecord,
  InsightRecord,
  ItemRecord,
  SpaceRecord,
  TimelineEventRecord,
  VaultState
} from "@/lib/vault-types";

const dataPath = path.join(process.cwd(), "data", "vault.json");

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
}

function buildId(prefix: string, value: string) {
  return `${prefix}-${slugify(value) || Date.now().toString()}`;
}

async function ensureStore() {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify(defaultVaultState, null, 2), "utf8");
  }
}

export async function readVaultState(): Promise<VaultState> {
  await ensureStore();
  const file = await fs.readFile(dataPath, "utf8");
  return JSON.parse(file) as VaultState;
}

export async function writeVaultState(state: VaultState) {
  await fs.writeFile(dataPath, JSON.stringify(state, null, 2), "utf8");
}

function getCollectionForSpace(state: VaultState, spaceId: string) {
  return (
    state.collections.find((collection) => collection.spaceId === spaceId) ??
    state.collections[0]
  );
}

function recalculateStaleSpaces(state: VaultState) {
  const now = Date.now();
  state.spaces = state.spaces.map((space) => {
    const latestItem = state.items
      .filter((item) => item.spaceId === space.id)
      .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt))[0];

    const stale =
      !latestItem || now - Date.parse(latestItem.updatedAt) > 1000 * 60 * 60 * 24 * 21;

    return { ...space, stale };
  });
}

function recalculateWeeklyDigest(state: VaultState) {
  const recentItems = [...state.items]
    .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt))
    .slice(0, 3);

  const themes = Array.from(new Set(recentItems.flatMap((item) => item.tags))).slice(0, 3);
  const staleCount = state.spaces.filter((space) => space.stale).length;

  state.vault.weeklyDigest = recentItems.length
    ? `Recent focus areas: ${themes.join(", ") || "general capture"}. ${staleCount} space${staleCount === 1 ? "" : "s"} need review.`
    : "No recent activity yet. Start by creating a space and saving a note.";
}

function recalculateHealthScore(state: VaultState) {
  const stalePenalty = state.spaces.filter((space) => space.stale).length * 8;
  const captureBonus = Math.min(state.items.length * 3, 18);
  state.vault.healthScore = Math.max(45, Math.min(96, 70 + captureBonus - stalePenalty));
}

export async function getInsights(state?: VaultState): Promise<InsightRecord[]> {
  const current = state ?? (await readVaultState());
  const insights: InsightRecord[] = [];

  const hasOnboarding = current.items.some((item) => item.tags.includes("Onboarding"));
  const hasBudget = current.items.some(
    (item) =>
      item.title.toLowerCase().includes("budget") ||
      item.content.toLowerCase().includes("budget") ||
      item.tags.includes("Finance")
  );

  if (hasOnboarding && !hasBudget) {
    insights.push({
      id: "insight-gap-budget",
      title: "Missing budget support for onboarding work",
      detail:
        "You have onboarding plans and launch scope decisions, but no linked budget or staffing document.",
      severity: "high",
      kind: "gap"
    });
  }

  const staleSpaces = current.spaces.filter((space) => space.stale);
  staleSpaces.forEach((space) => {
    insights.push({
      id: `insight-stale-${space.id}`,
      title: `${space.name} may be stale`,
      detail: `${space.name} has not received a recent update and should be reviewed.`,
      severity: "medium",
      kind: "stale"
    });
  });

  const tags = current.items.flatMap((item) => item.tags);
  const repeated = tags.find(
    (tag, index) =>
      tags.indexOf(tag) !== index && ["Security", "Research", "Onboarding"].includes(tag)
  );

  if (repeated) {
    insights.push({
      id: `insight-pattern-${repeated.toLowerCase()}`,
      title: `${repeated} is a repeated theme`,
      detail: `The vault keeps returning to ${repeated.toLowerCase()} across multiple documents.`,
      severity: "low",
      kind: "pattern"
    });
  }

  return insights.length ? insights : defaultInsights.slice(0, 1);
}

export async function getVaultSnapshot() {
  const state = await readVaultState();
  recalculateStaleSpaces(state);
  recalculateWeeklyDigest(state);
  recalculateHealthScore(state);
  await writeVaultState(state);

  return {
    ...state,
    insights: await getInsights(state)
  };
}

export async function createSpace(input: {
  name: string;
  description: string;
  icon?: string;
  pinned?: boolean;
}) {
  const state = await readVaultState();
  await ensureCanCreateSpace(state.spaces.length);
  const spaceId = buildId("space", input.name);
  const collectionId = buildId("collection", `${input.name}-general`);

  const newSpace: SpaceRecord = {
    id: spaceId,
    name: input.name,
    description: input.description,
    icon: input.icon ?? "Folder",
    pinned: Boolean(input.pinned),
    stale: false
  };

  const defaultCollection: CollectionRecord = {
    id: collectionId,
    spaceId,
    name: "General",
    description: `Default collection for ${input.name}.`
  };

  const now = new Date().toISOString();
  const event: TimelineEventRecord = {
    id: buildId("event", `${spaceId}-${now}`),
    date: now,
    title: `Created ${input.name} space`,
    description: `Added a new space with a default General collection.`,
    type: "upload",
    spaceId
  };

  state.spaces.unshift(newSpace);
  state.collections.unshift(defaultCollection);
  state.timeline.unshift(event);

  recalculateStaleSpaces(state);
  recalculateWeeklyDigest(state);
  recalculateHealthScore(state);
  await writeVaultState(state);

  return newSpace;
}

export async function createCollection(input: {
  spaceId: string;
  name: string;
  description: string;
}) {
  const state = await readVaultState();
  const collectionId = buildId("collection", `${input.spaceId}-${input.name}`);

  const newCollection: CollectionRecord = {
    id: collectionId,
    spaceId: input.spaceId,
    name: input.name,
    description: input.description
  };

  state.collections.unshift(newCollection);
  state.timeline.unshift({
    id: buildId("event", `${collectionId}-${Date.now()}`),
    date: new Date().toISOString(),
    title: `Created ${input.name} collection`,
    description: `Added a new collection inside its parent space.`,
    type: "upload",
    spaceId: input.spaceId
  });

  recalculateWeeklyDigest(state);
  recalculateHealthScore(state);
  await writeVaultState(state);

  return newCollection;
}

export async function createNote(input: {
  title: string;
  content: string;
  spaceId: string;
  collectionId?: string;
  type?: ItemRecord["type"];
  source?: string;
}) {
  const state = await readVaultState();
  await ensureCanCreateItem(state.items.length);
  const now = new Date().toISOString();
  const collection = input.collectionId
    ? state.collections.find((candidate) => candidate.id === input.collectionId)
    : getCollectionForSpace(state, input.spaceId);

  const document = await processDocument(input.title, input.content, input.source);
  const itemId = buildId("item", `${input.title}-${Date.now()}`);

  const newItem: ItemRecord = {
    id: itemId,
    collectionId: collection?.id ?? state.collections[0].id,
    spaceId: input.spaceId,
    title: input.title,
    type: input.type ?? "note",
    summary: document.summary,
    content: input.content,
    createdAt: now,
    updatedAt: now,
    tags: document.suggestedTags,
    trustLevel: document.trustLevel,
    sensitivity: document.sensitivity,
    source: input.source
  };

  const event: TimelineEventRecord = {
    id: buildId("event", `${itemId}-${now}`),
    date: now,
    title: `Saved ${newItem.title}`,
    description: document.summary,
    type: newItem.type === "decision_record" ? "decision" : "upload",
    itemId,
    spaceId: input.spaceId
  };

  state.items.unshift(newItem);
  state.timeline.unshift(event);

  recalculateStaleSpaces(state);
  recalculateWeeklyDigest(state);
  recalculateHealthScore(state);
  await writeVaultState(state);

  return newItem;
}

export async function deleteItem(itemId: string) {
  const state = await readVaultState();
  const item = state.items.find((candidate) => candidate.id === itemId);

  if (!item) {
    return null;
  }

  state.items = state.items.filter((candidate) => candidate.id !== itemId);
  state.timeline.unshift({
    id: buildId("event", `${itemId}-deleted-${Date.now()}`),
    date: new Date().toISOString(),
    title: `Deleted ${item.title}`,
    description: `Removed ${item.title} from the vault.`,
    type: "upload",
    spaceId: item.spaceId
  });

  recalculateStaleSpaces(state);
  recalculateWeeklyDigest(state);
  recalculateHealthScore(state);
  await writeVaultState(state);

  return item;
}

export async function exportVaultState() {
  return readVaultState();
}
