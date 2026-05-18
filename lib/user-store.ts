import { createHash, randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  plan: "free" | "pro" | "team" | "business";
  createdAt: string;
};

type SessionRecord = {
  token: string;
  userId: string;
  createdAt: string;
};

type AuthState = {
  users: StoredUser[];
  sessions: SessionRecord[];
};

const authPath = path.join(process.cwd(), "data", "auth.json");

const defaultAuthState: AuthState = {
  users: [
    {
      id: "user-founder",
      name: "Founder",
      email: "founder@nexvault.local",
      passwordHash: createHash("sha256").update("demo1234").digest("hex"),
      plan: "free",
      createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString()
    }
  ],
  sessions: []
};

async function ensureAuthStore() {
  try {
    await fs.access(authPath);
  } catch {
    await fs.mkdir(path.dirname(authPath), { recursive: true });
    await fs.writeFile(authPath, JSON.stringify(defaultAuthState, null, 2), "utf8");
  }
}

async function readAuthState() {
  await ensureAuthStore();
  const raw = await fs.readFile(authPath, "utf8");
  const parsed = JSON.parse(raw) as AuthState;
  return {
    ...parsed,
    users: parsed.users.map((user) => ({
      ...user,
      plan: user.plan ?? "free"
    }))
  };
}

async function writeAuthState(state: AuthState) {
  await fs.writeFile(authPath, JSON.stringify(state, null, 2), "utf8");
}

export function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export async function findUserByEmail(email: string) {
  const state = await readAuthState();
  return state.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function findUserById(userId: string) {
  const state = await readAuthState();
  return state.users.find((user) => user.id === userId) ?? null;
}

export async function createUser(input: { name: string; email: string; password: string }) {
  const state = await readAuthState();
  const existing = state.users.find(
    (user) => user.email.toLowerCase() === input.email.toLowerCase()
  );

  if (existing) {
    return { ok: false as const, message: "An account with that email already exists." };
  }

  const user: StoredUser = {
    id: `user-${randomUUID()}`,
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash: hashPassword(input.password),
    plan: "free",
    createdAt: new Date().toISOString()
  };

  state.users.unshift(user);
  await writeAuthState(state);

  return { ok: true as const, user };
}

export async function createSession(userId: string) {
  const state = await readAuthState();
  const session: SessionRecord = {
    token: randomUUID(),
    userId,
    createdAt: new Date().toISOString()
  };

  state.sessions = state.sessions.filter((candidate) => candidate.userId !== userId);
  state.sessions.unshift(session);
  await writeAuthState(state);

  return session;
}

export async function getSession(token: string) {
  const state = await readAuthState();
  return state.sessions.find((session) => session.token === token) ?? null;
}

export async function deleteSession(token: string) {
  const state = await readAuthState();
  state.sessions = state.sessions.filter((session) => session.token !== token);
  await writeAuthState(state);
}

export async function updateUserPlan(
  userId: string,
  plan: "free" | "pro" | "team" | "business"
) {
  const state = await readAuthState();
  state.users = state.users.map((user) => (user.id === userId ? { ...user, plan } : user));
  await writeAuthState(state);
}
