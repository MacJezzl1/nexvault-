# NEXVAULT

Private AI memory infrastructure for people, teams, and companies.

## One-line pitch

NEXVAULT is a private AI knowledge vault that helps people and companies store, organize, search, and ask questions across their most important information with source citations, permissions, and security built in.

## MVP scope

- Personal vaults
- Spaces and collections
- Notes, PDF uploads, image uploads
- Text extraction and summaries
- Full-text and semantic search
- Ask Vault chat with source citations
- Export and delete controls

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma with PostgreSQL and pgvector
- S3-compatible object storage
- Queue-based background processing

## Getting started

1. Install Node.js 20+ and PostgreSQL 16+.
2. Copy `.env.example` to `.env.local`.
3. Install dependencies with `npm install`.
4. Run Prisma migrations.
5. Start the app with `npm run dev`.

## Docs

- `docs/product-spec.md`
- `docs/architecture.md`
- `docs/security.md`
- `docs/ai-system.md`
- `docs/roadmap.md`
