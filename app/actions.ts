"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCollection, createNote, createSpace, deleteItem } from "@/lib/vault-store";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createSpaceAction(formData: FormData) {
  const name = getString(formData, "name");
  const description = getString(formData, "description");

  if (!name || !description) {
    return;
  }

  await createSpace({
    name,
    description,
    pinned: formData.get("pinned") === "on"
  });

  revalidatePath("/dashboard");
  revalidatePath("/spaces");
  revalidatePath("/vault");
}

export async function createNoteAction(formData: FormData) {
  const title = getString(formData, "title");
  const content = getString(formData, "content");
  const spaceId = getString(formData, "spaceId");
  const collectionId = getString(formData, "collectionId");
  const type = getString(formData, "type");

  if (!title || !content || !spaceId) {
    return;
  }

  await createNote({
    title,
    content,
    spaceId,
    collectionId: collectionId || undefined,
    type: (type as "note" | "meeting_note" | "decision_record") || "note"
  });

  revalidatePath("/dashboard");
  revalidatePath("/vault");
  revalidatePath("/spaces");
  revalidatePath("/timeline");
  revalidatePath("/insights");
  revalidatePath("/search");
}

export async function createCollectionAction(formData: FormData) {
  const spaceId = getString(formData, "spaceId");
  const name = getString(formData, "name");
  const description = getString(formData, "description");

  if (!spaceId || !name || !description) {
    return;
  }

  await createCollection({
    spaceId,
    name,
    description
  });

  revalidatePath("/spaces");
  revalidatePath(`/spaces/${spaceId}`);
  revalidatePath("/vault");
}

export async function deleteItemAction(formData: FormData) {
  const itemId = getString(formData, "itemId");
  const spaceId = getString(formData, "spaceId");

  if (!itemId) {
    return;
  }

  await deleteItem(itemId);

  revalidatePath("/dashboard");
  revalidatePath("/vault");
  revalidatePath("/spaces");
  if (spaceId) {
    revalidatePath(`/spaces/${spaceId}`);
  }
  revalidatePath("/timeline");
  revalidatePath("/insights");
  revalidatePath("/search");

  redirect(spaceId ? `/spaces/${spaceId}` : "/vault");
}
