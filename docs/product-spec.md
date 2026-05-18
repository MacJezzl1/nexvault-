# NEXVAULT MVP Product Specification

## Product goal

Prove that a user can upload important knowledge, ask a question, and receive a useful answer with trustworthy source citations.

## Product architecture

- Personal vaults first, with upgrade path to organization vaults.
- Every vault contains spaces, collections, and items.
- Every item is processed into extracted text, metadata, summary, and embeddings.
- Every AI answer is retrieval-based and permission-aware.

## MVP user flows

1. User signs up and creates a personal vault.
2. User creates spaces and collections.
3. User uploads a PDF or writes a note.
4. Background jobs extract text, summarize, tag, and embed the item.
5. User searches by keyword or semantic meaning.
6. User asks a question in Ask Vault.
7. System retrieves relevant chunks and cites source items.

## API routes

- `POST /api/auth/sign-up`
- `POST /api/auth/sign-in`
- `GET /api/vaults`
- `POST /api/vaults`
- `GET /api/spaces`
- `POST /api/spaces`
- `GET /api/collections/:id`
- `POST /api/items`
- `GET /api/items/:id`
- `DELETE /api/items/:id`
- `POST /api/upload`
- `POST /api/search`
- `POST /api/ai/ask`

## UI pages

- `/`: landing page and product pitch
- `/dashboard`: recent activity, upload entrypoint, ask vault entrypoint
- `/vault`: vault selector and plan overview
- `/spaces/[spaceId]`: structured knowledge view
- `/collections/[collectionId]`: grouped item view
- `/items/[itemId]`: preview, summary, metadata, related items
- `/ask`: RAG chat with citations
- `/search`: hybrid search interface
- `/timeline`: knowledge timeline
- `/insights`: stale docs, duplicates, gaps
- `/settings`: export, delete, profile, model settings

## Components

- Layout: sidebar, topbar, mobile nav
- Capture: upload dropzone, note editor, metadata panel
- Retrieval: search bar, filters, results card
- AI: chat, citations, source cards, suggested questions
- Organization: collection tree, item cards, tag picker

## First 30 development tasks

1. Initialize Next.js repository with TypeScript and Tailwind.
2. Add ESLint, Prisma, Vitest, and base configs.
3. Create initial landing page and dashboard shell.
4. Model core Prisma entities.
5. Add PostgreSQL and pgvector setup docs.
6. Add authentication provider integration.
7. Create personal vault onboarding.
8. Build space CRUD.
9. Build collection CRUD.
10. Build note creation flow.
11. Build file upload endpoint.
12. Wire S3-compatible object storage.
13. Persist item metadata.
14. Add PDF text extraction worker.
15. Add image OCR worker.
16. Add summary generation worker.
17. Add tag suggestion worker.
18. Add embedding generation worker.
19. Add full-text search query.
20. Add vector similarity query.
21. Merge keyword and vector ranking.
22. Build Ask Vault API route.
23. Enforce permission-aware retrieval.
24. Add citation formatting in AI responses.
25. Build item details page with source previews.
26. Add delete and export controls.
27. Add audit log events for key actions.
28. Add vault insights page.
29. Add integration tests for retrieval and permissions.
30. Prepare deployment pipeline and secrets management.
