-- Materia molecule graph — per /docs/13_Data_Model.md
-- Clinical values MUST reference a source_id (constitution 3.2).
-- Publish states: draft | reviewed | published (constitution 3.3).

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE TYPE publish_state AS ENUM ('draft', 'reviewed', 'published');
CREATE TYPE user_mode AS ENUM ('patient', 'student', 'pharmacist', 'doctor');
CREATE TYPE tier_kind AS ENUM ('free', 'student', 'professional', 'institution');
CREATE TYPE schedule_code AS ENUM ('S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6');
CREATE TYPE traffic_light AS ENUM ('red', 'orange', 'yellow');
CREATE TYPE interaction_severity AS ENUM ('minor', 'moderate', 'major', 'contraindicated');
CREATE TYPE source_type AS ENUM ('guideline', 'register', 'sep', 'insert', 'original_authoring', 'other');

CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  citation TEXT NOT NULL,
  source_type source_type NOT NULL,
  url TEXT,
  last_reviewed DATE NOT NULL,
  reviewer_credential TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE molecules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  inn_name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  atc_code TEXT,
  therapeutic_area TEXT NOT NULL,
  synonyms TEXT[] NOT NULL DEFAULT '{}',
  publish_state publish_state NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Per-fact sourced clinical fields on molecule
CREATE TABLE molecule_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  molecule_id UUID NOT NULL REFERENCES molecules(id) ON DELETE CASCADE,
  field_path TEXT NOT NULL,
  value_text TEXT NOT NULL,
  source_id UUID NOT NULL REFERENCES sources(id),
  publish_state publish_state NOT NULL DEFAULT 'draft',
  last_reviewed DATE NOT NULL,
  ai_drafted BOOLEAN NOT NULL DEFAULT false,
  version INT NOT NULL DEFAULT 1,
  UNIQUE (molecule_id, field_path, version)
);

CREATE TABLE manufacturers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  marketing_company TEXT,
  plant_site TEXT,
  api_origin TEXT,
  packaging_site TEXT,
  made_in_sa BOOLEAN
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  molecule_id UUID NOT NULL REFERENCES molecules(id) ON DELETE CASCADE,
  manufacturer_id UUID NOT NULL REFERENCES manufacturers(id),
  brand_name TEXT NOT NULL,
  strength TEXT NOT NULL,
  form TEXT NOT NULL,
  sahpra_reg_no TEXT,
  schedule schedule_code NOT NULL,
  is_originator BOOLEAN NOT NULL DEFAULT false,
  is_discontinued BOOLEAN NOT NULL DEFAULT false,
  discontinued_date DATE,
  bioequivalent_flag BOOLEAN,
  synonym_keys TEXT[] NOT NULL DEFAULT '{}',
  publish_state publish_state NOT NULL DEFAULT 'draft'
);

CREATE TABLE excipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  purpose TEXT,
  allergy_risk TEXT,
  absorption_note TEXT,
  can_become_active BOOLEAN DEFAULT false
);

CREATE TABLE product_excipients (
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  excipient_id UUID NOT NULL REFERENCES excipients(id),
  PRIMARY KEY (product_id, excipient_id)
);

CREATE TABLE safety_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  molecule_id UUID NOT NULL UNIQUE REFERENCES molecules(id) ON DELETE CASCADE,
  publish_state publish_state NOT NULL DEFAULT 'draft'
);

CREATE TABLE safety_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  safety_profile_id UUID NOT NULL REFERENCES safety_profiles(id) ON DELETE CASCADE,
  field_path TEXT NOT NULL,
  value_json JSONB NOT NULL,
  source_id UUID NOT NULL REFERENCES sources(id),
  publish_state publish_state NOT NULL DEFAULT 'draft',
  last_reviewed DATE NOT NULL,
  ai_drafted BOOLEAN NOT NULL DEFAULT false,
  version INT NOT NULL DEFAULT 1,
  CONSTRAINT safety_facts_require_source CHECK (source_id IS NOT NULL)
);

CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  molecule_a_id UUID NOT NULL REFERENCES molecules(id),
  molecule_b_id UUID NOT NULL REFERENCES molecules(id),
  severity interaction_severity NOT NULL,
  publish_state publish_state NOT NULL DEFAULT 'draft',
  CHECK (molecule_a_id <> molecule_b_id)
);

CREATE TABLE interaction_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interaction_id UUID NOT NULL REFERENCES interactions(id) ON DELETE CASCADE,
  field_path TEXT NOT NULL,
  value_text TEXT NOT NULL,
  source_id UUID NOT NULL REFERENCES sources(id),
  publish_state publish_state NOT NULL DEFAULT 'draft',
  last_reviewed DATE NOT NULL
);

CREATE TABLE price_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sep_zar NUMERIC(12, 2),
  effective_date DATE NOT NULL,
  source_id UUID NOT NULL REFERENCES sources(id),
  publish_state publish_state NOT NULL DEFAULT 'draft',
  notes TEXT
);

CREATE TABLE formulary_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  scheme_name TEXT NOT NULL,
  reimbursed BOOLEAN NOT NULL,
  co_pay_estimate_zar NUMERIC(12, 2),
  source_id UUID NOT NULL REFERENCES sources(id),
  publish_state publish_state NOT NULL DEFAULT 'draft'
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  molecule_id UUID NOT NULL REFERENCES molecules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  publish_state publish_state NOT NULL DEFAULT 'draft'
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_order INT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  publish_state publish_state NOT NULL DEFAULT 'draft'
);

CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  choices TEXT[] NOT NULL,
  correct_index INT NOT NULL,
  teach_from_miss TEXT NOT NULL,
  publish_state publish_state NOT NULL DEFAULT 'draft'
);

-- Org hierarchy present from day one (Doc 13)
CREATE TABLE organisations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('university', 'hospital', 'pharmacy_chain', 'other')),
  sso_config JSONB
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  mode user_mode NOT NULL DEFAULT 'patient',
  tier tier_kind NOT NULL DEFAULT 'free',
  language TEXT NOT NULL DEFAULT 'en',
  student_verified BOOLEAN NOT NULL DEFAULT false,
  org_id UUID REFERENCES organisations(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- POPIA: health data separated
CREATE TABLE consent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL,
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version TEXT NOT NULL,
  meta JSONB
);

CREATE TABLE regimens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  molecule_id UUID REFERENCES molecules(id),
  schedule_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  molecule_id UUID NOT NULL REFERENCES molecules(id),
  mastery NUMERIC(5, 2) NOT NULL DEFAULT 0,
  streak INT NOT NULL DEFAULT 0,
  spaced_rep_schedule JSONB
);

CREATE TABLE seats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('member', 'admin')),
  UNIQUE (org_id, user_id)
);

CREATE TABLE cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  name TEXT NOT NULL
);

CREATE TABLE cohort_members (
  cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (cohort_id, user_id)
);

CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id UUID REFERENCES users(id),
  referee_user_id UUID REFERENCES users(id),
  code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  reward TEXT
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  org_id UUID REFERENCES organisations(id),
  tier tier_kind NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  renews_at TIMESTAMPTZ
);

CREATE INDEX molecules_slug_idx ON molecules (slug);
CREATE INDEX products_brand_trgm ON products USING gin (brand_name gin_trgm_ops);
CREATE INDEX molecule_facts_source_idx ON molecule_facts (source_id);
CREATE INDEX safety_facts_source_idx ON safety_facts (source_id);

COMMENT ON TABLE molecule_facts IS 'Per-fact sourcing: clinical field cannot exist without source_id';
COMMENT ON TABLE safety_facts IS 'Per-fact sourcing enforced; draft never renders to end users';
