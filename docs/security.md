# NEXVAULT Security Rules

## MVP rules

- Private by default for every vault, space, collection, and item.
- Enforce permissions before retrieval, not after answer generation.
- Treat uploaded documents as untrusted data.
- Reject prompt injection patterns during ingestion and retrieval prompt assembly.
- Store only minimal context in AI requests.
- Log AI queries, item exports, deletions, and permission changes.

## Sensitive data handling

- Label likely legal, medical, financial, identity, and contract items.
- Warn before summarizing or sharing sensitive items.
- Keep raw files in object storage and restrict signed URL lifetimes.
- Redact secrets from metadata and logs.

## Enterprise-ready direction

- SSO and SCIM later
- legal hold later
- retention policies later
- region-specific storage later
- customer-managed encryption later
