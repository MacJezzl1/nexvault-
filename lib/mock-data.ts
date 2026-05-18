export type DemoTag = {
  id: string;
  name: string;
  color: string;
};

export type DemoItem = {
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
};

export type DemoCollection = {
  id: string;
  spaceId: string;
  name: string;
  description: string;
};

export type DemoSpace = {
  id: string;
  name: string;
  description: string;
  icon: string;
  pinned: boolean;
  stale: boolean;
};

export type DemoInsight = {
  id: string;
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
  kind: "gap" | "duplicate" | "stale" | "contradiction" | "pattern";
};

export type DemoTimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "upload" | "decision" | "meeting" | "insight";
  itemId?: string;
  spaceId?: string;
};

export type DemoConversationAnswer = {
  answer: string;
  confidence: "high" | "medium" | "low";
  citations: Array<{
    itemId: string;
    quote: string;
  }>;
  followUps: string[];
};

export const demoVault = {
  id: "vault-personal-1",
  name: "Founder Memory Vault",
  mode: "personal",
  owner: "MacJezzl1",
  weeklyDigest:
    "Your recent focus is onboarding, research operations, and vault trust rules. The system also flagged two stale process notes.",
  healthScore: 82
};

export const demoTags: DemoTag[] = [
  { id: "tag-onboarding", name: "Onboarding", color: "amber" },
  { id: "tag-security", name: "Security", color: "moss" },
  { id: "tag-research", name: "Research", color: "steel" },
  { id: "tag-finance", name: "Finance", color: "amber" }
];

export const demoSpaces: DemoSpace[] = [
  {
    id: "space-inbox",
    name: "Inbox",
    description: "Quick capture for raw notes, imports, and triage.",
    icon: "Tray",
    pinned: true,
    stale: false
  },
  {
    id: "space-product",
    name: "Product",
    description: "Roadmaps, onboarding notes, release decisions, and user pain points.",
    icon: "Layers",
    pinned: true,
    stale: false
  },
  {
    id: "space-operations",
    name: "Operations",
    description: "Processes, weekly reviews, internal workflows, and recurring tasks.",
    icon: "Compass",
    pinned: true,
    stale: true
  },
  {
    id: "space-research",
    name: "Research",
    description: "Source documents, AI notes, market scans, and strategic observations.",
    icon: "Search",
    pinned: false,
    stale: false
  }
];

export const demoCollections: DemoCollection[] = [
  {
    id: "collection-capture",
    spaceId: "space-inbox",
    name: "Quick Capture",
    description: "Unprocessed notes and clips waiting for categorization."
  },
  {
    id: "collection-onboarding",
    spaceId: "space-product",
    name: "Onboarding",
    description: "User onboarding experiments, meeting notes, and decisions."
  },
  {
    id: "collection-releases",
    spaceId: "space-product",
    name: "Release Planning",
    description: "Milestones, launch blockers, and cut scope decisions."
  },
  {
    id: "collection-processes",
    spaceId: "space-operations",
    name: "Core Processes",
    description: "Internal operating procedures and weekly rituals."
  },
  {
    id: "collection-ai",
    spaceId: "space-research",
    name: "AI Memory Research",
    description: "RAG design notes, competitor comparisons, and trust models."
  }
];

export const demoItems: DemoItem[] = [
  {
    id: "item-onboarding-retro",
    collectionId: "collection-onboarding",
    spaceId: "space-product",
    title: "Q2 onboarding retrospective",
    type: "meeting_note",
    summary:
      "The team agreed that activation drops after account creation because setup feels empty. Guided templates and sample vault content were prioritized.",
    content:
      "The team reviewed activation metrics and agreed the first five minutes feel too blank. We decided to add guided templates, sample documents, and a first-question prompt on the dashboard. We explicitly did not want a generic empty notes experience. We also agreed that every AI answer must cite a vault source so new users trust the output.",
    createdAt: "2026-05-08T09:30:00.000Z",
    updatedAt: "2026-05-08T11:15:00.000Z",
    tags: ["Onboarding", "Research"],
    trustLevel: "official",
    sensitivity: "product"
  },
  {
    id: "item-launch-decision",
    collectionId: "collection-releases",
    spaceId: "space-product",
    title: "MVP launch decision log",
    type: "decision_record",
    summary:
      "The initial product scope was narrowed to upload, organize, search, ask, and cite. Mobile and deep integrations were deferred.",
    content:
      "Decision: the public MVP must focus on Upload, Organize, Search, Ask, and Cite. We explicitly deferred mobile apps, Slack integrations, and advanced team dashboards. The success metric is whether a user uploads real information and receives a useful answer with trusted citations. A second decision was to keep personal and organization mode on one core data model.",
    createdAt: "2026-05-11T14:00:00.000Z",
    updatedAt: "2026-05-11T14:20:00.000Z",
    tags: ["Onboarding", "Security"],
    trustLevel: "official",
    sensitivity: "product"
  },
  {
    id: "item-ops-playbook",
    collectionId: "collection-processes",
    spaceId: "space-operations",
    title: "Weekly operating cadence",
    type: "note",
    summary:
      "Defines weekly review, documentation owner checks, and stale knowledge triage.",
    content:
      "Every Monday we review open product questions, stale docs, and missing owners. Every Friday we log decisions, archive duplicate notes, and update the knowledge digest. The current gap is that finance-related documents still lack a dedicated review owner.",
    createdAt: "2026-04-29T10:00:00.000Z",
    updatedAt: "2026-05-02T16:00:00.000Z",
    tags: ["Finance", "Research"],
    trustLevel: "draft",
    sensitivity: "financial"
  },
  {
    id: "item-rag-security",
    collectionId: "collection-ai",
    spaceId: "space-research",
    title: "Permission-aware RAG notes",
    type: "pdf",
    summary:
      "Documents the rule that retrieval must be scoped by permissions before prompt assembly and that uploaded documents are untrusted data.",
    content:
      "Retrieval must happen only across items the user can access. Uploaded documents are untrusted data, never system instructions. The system should detect prompt injection phrases and isolate them from answer generation. Answers need explicit citations and an insufficiency response when evidence is weak.",
    createdAt: "2026-05-06T12:00:00.000Z",
    updatedAt: "2026-05-10T18:30:00.000Z",
    tags: ["Security", "Research"],
    trustLevel: "official",
    sensitivity: "product"
  },
  {
    id: "item-founder-brain-dump",
    collectionId: "collection-capture",
    spaceId: "space-inbox",
    title: "Founder brain dump: vault map ideas",
    type: "note",
    summary:
      "Early concept note about timelines, contradiction detection, and a knowledge graph.",
    content:
      "Future features should include a vault map, time travel search, contradiction detection, and company knowledge health scoring. A strong insight is that AI without memory is shallow, but memory without privacy is dangerous.",
    createdAt: "2026-05-15T08:20:00.000Z",
    updatedAt: "2026-05-15T08:20:00.000Z",
    tags: ["Research"],
    trustLevel: "personal_note",
    sensitivity: "product"
  }
];

export const demoInsights: DemoInsight[] = [
  {
    id: "insight-gap-budget",
    title: "Missing budget support for onboarding work",
    detail: "You have onboarding plans and launch scope decisions, but no budget or staffing document linked to them.",
    severity: "high",
    kind: "gap"
  },
  {
    id: "insight-stale-ops",
    title: "Operations playbook may be stale",
    detail: "The weekly operating cadence note has not been refreshed since May 2, 2026.",
    severity: "medium",
    kind: "stale"
  },
  {
    id: "insight-pattern-trust",
    title: "Trust and citations are repeated themes",
    detail: "Across product and research notes, source-cited AI answers appear as a core product requirement.",
    severity: "low",
    kind: "pattern"
  }
];

export const demoTimeline: DemoTimelineEvent[] = [
  {
    id: "event-1",
    date: "2026-05-15T08:20:00.000Z",
    title: "Captured founder idea note",
    description: "Saved a quick note about vault maps, contradiction detection, and time travel search.",
    type: "upload",
    itemId: "item-founder-brain-dump",
    spaceId: "space-inbox"
  },
  {
    id: "event-2",
    date: "2026-05-11T14:00:00.000Z",
    title: "Logged MVP scope decision",
    description: "Decided to keep MVP tightly focused on upload, organize, search, ask, and cite.",
    type: "decision",
    itemId: "item-launch-decision",
    spaceId: "space-product"
  },
  {
    id: "event-3",
    date: "2026-05-08T09:30:00.000Z",
    title: "Onboarding retrospective added",
    description: "Reviewed activation drop-off and prioritized guided templates and sample content.",
    type: "meeting",
    itemId: "item-onboarding-retro",
    spaceId: "space-product"
  },
  {
    id: "event-4",
    date: "2026-05-06T12:00:00.000Z",
    title: "Security research indexed",
    description: "Added a permission-aware RAG note covering prompt injection and access control.",
    type: "insight",
    itemId: "item-rag-security",
    spaceId: "space-research"
  }
];

export const suggestedQuestions = [
  "What decisions did we make about onboarding?",
  "What security rules keep appearing in my notes?",
  "What am I missing for launch readiness?",
  "Summarize the product strategy across my vault."
];

export function getSpaceById(spaceId: string) {
  return demoSpaces.find((space) => space.id === spaceId);
}

export function getCollectionById(collectionId: string) {
  return demoCollections.find((collection) => collection.id === collectionId);
}

export function getItemById(itemId: string) {
  return demoItems.find((item) => item.id === itemId);
}
