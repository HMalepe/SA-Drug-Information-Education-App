-- Materia RAG chunks — per /docs/17_AI_Strategy.md + constitution 3.1–3.3
-- pgvector for semantic retrieve; publish_state + source_id enforce grounding.
-- NEVER store SAMF/MIMS/Lexicomp text (license_class = licensed_forbidden is rejected at ingest).

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TYPE rag_license_class AS ENUM (
  'owned_authoring',
  'public_guideline',
  'register_metadata',
  'sep_public',
  'insert_owned',
  'licensed_forbidden'
);

CREATE TABLE rag_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  molecule_id UUID REFERENCES molecules(id) ON DELETE CASCADE,
  field_path TEXT NOT NULL,
  chunk_text TEXT NOT NULL,
  source_id UUID NOT NULL REFERENCES sources(id),
  publish_state publish_state NOT NULL DEFAULT 'draft',
  license_class rag_license_class NOT NULL,
  embedding vector(64),
  embedder_id TEXT NOT NULL DEFAULT 'local-bow-v1',
  last_reviewed DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT rag_chunks_no_forbidden CHECK (license_class <> 'licensed_forbidden')
);

CREATE INDEX rag_chunks_molecule_idx ON rag_chunks (molecule_id);
CREATE INDEX rag_chunks_publish_idx ON rag_chunks (publish_state);
CREATE INDEX rag_chunks_license_idx ON rag_chunks (license_class);

-- IVFFlat optional once row count justifies; sequential scan fine for early corpus.
-- CREATE INDEX rag_chunks_embedding_idx ON rag_chunks
--   USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

COMMENT ON TABLE rag_chunks IS
  'Curated RAG corpus. Only published + sourced + non-forbidden license rows may retrieve.';
