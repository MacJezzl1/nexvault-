export async function processDocument(itemId: string) {
  return {
    itemId,
    extractedText: "",
    summary: "",
    language: "en",
    suggestedTags: []
  };
}
