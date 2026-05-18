# NEXVAULT Architecture

## System layout

- Frontend: Next.js App Router with server components for data reads and client components for chat, uploads, and editor interactions.
- API layer: Next.js route handlers for auth, CRUD, upload orchestration, search, and AI.
- Database: PostgreSQL for transactional data, `pgvector` for embeddings, JSON metadata for flexible ingestion state.
- Storage: S3-compatible object storage for PDFs, images, and exports.
- Jobs: Queue workers for OCR, extraction, summaries, embeddings, and digests.

## Core services

- Auth service: user identity and session checks.
- Vault service: create and manage personal or organization vaults.
- Item service: persist metadata, extraction state, and relationships.
- Search service: hybrid search over full-text and vector similarity.
- AI service: retrieval, prompt assembly, citation formatting, answer generation.
- Permission service: checks before retrieval and before response generation.
- Audit service: records access, edits, deletes, and AI queries.

## Data boundaries

- The app never sends an entire vault to a model.
- Retrieval is scoped by vault, user, selected filters, and permissions.
- Documents are parsed as untrusted data, never instructions.
- Sensitive items can require stronger review flows before summarization or sharing.

## Deployment shape

- Web app on Vercel, Fly.io, or a container platform.
- PostgreSQL on Neon, Supabase, RDS, or Cloud SQL.
- Object storage on Cloudflare R2, S3, or Supabase Storage.
- Queue worker as a separate process for ingestion jobs.
