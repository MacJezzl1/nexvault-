export type VaultMode = "personal" | "organization";

export type VaultRecord = {
  id: string;
  name: string;
  mode: VaultMode;
  owner: string;
  weeklyDigest: string;
  healthScore: number;
};

export type TagRecord = {
  id: string;
  name: string;
  color: string;
};

export type ItemRecord = {
  id: string;
  collectionId: string;
  spaceId: string;
  title: string;
  type: "note" | "pdf" | "image" | "decision_record" | "meeting_note";
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  trustLevel: "official" | "draft" | "personal_note" | "imported";
  sensitivity: "normal" | "financial" | "contract" | "product";
  source?: string;
};

export type RetrievalScope = {
  query?: string;
  spaceId?: string;
  type?: ItemRecord["type"];
  tag?: string;
  trustLevel?: ItemRecord["trustLevel"];
  sensitivity?: ItemRecord["sensitivity"];
};

export type CollectionRecord = {
  id: string;
  spaceId: string;
  name: string;
  description: string;
};

export type SpaceRecord = {
  id: string;
  name: string;
  description: string;
  icon: string;
  pinned: boolean;
  stale: boolean;
};

export type InsightRecord = {
  id: string;
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
  kind: "gap" | "duplicate" | "stale" | "contradiction" | "pattern";
};

export type TimelineEventRecord = {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "upload" | "decision" | "meeting" | "insight";
  itemId?: string;
  spaceId?: string;
};

export type ConversationAnswer = {
  answer: string;
  confidence: "high" | "medium" | "low";
  citations: Array<{
    itemId: string;
    title: string;
    quote: string;
    spaceName: string;
    itemType: ItemRecord["type"];
  }>;
  followUps: string[];
};

export type VaultState = {
  vault: VaultRecord;
  tags: TagRecord[];
  spaces: SpaceRecord[];
  collections: CollectionRecord[];
  items: ItemRecord[];
  timeline: TimelineEventRecord[];
};
