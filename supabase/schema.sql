-- ==============================================================================
-- SALESFORCE MCQ PWA - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this SQL in your Supabase Dashboard:
-- 1. Go to your Supabase Project (https://supabase.com/dashboard)
-- 2. Click on the "SQL Editor" tab on the left sidebar
-- 3. Click "New Query", paste this entire script, and click "Run" (▶)
-- ==============================================================================

-- 1. Create the quiz_attempts table
-- This table stores each completed quiz session.
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    -- id: Unique identifier generated automatically using UUID v4
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- created_at: Automatically captures the exact timestamp when the quiz was finished
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- topic: Which Salesforce topic was practiced
    -- e.g. "Security & Access", "Data Modeling", "Process Automation", "Apex & Architecture"
    topic TEXT NOT NULL,

    -- difficulty: The challenge level chosen
    -- e.g. "Beginner", "Intermediate", "Tricky Scenario"
    difficulty TEXT NOT NULL,

    -- score: How many questions the user answered correctly (e.g. 5 out of 7)
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 7),

    -- total_questions: Always 7 in our engine
    total_questions INTEGER NOT NULL DEFAULT 7,

    -- questions_data: High-efficiency JSONB column storing the snapshot of questions,
    -- user selections, correct answers, and AI explanations.
    -- Storing this as JSONB lets the History view instantly review any past quiz
    -- without needing complex multi-table JOINs.
    questions_data JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 2. Create an index on created_at for fast descending history queries
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at 
ON public.quiz_attempts (created_at DESC);

-- 3. Enable Row Level Security (RLS)
-- Supabase enforces security at the row level. By enabling RLS, we ensure that
-- unauthorized database actions are blocked by default unless explicitly allowed by a Policy.
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for Public / Anonymous Access
-- Since this is an open-learning PWA where users take quizzes without a mandatory password,
-- we allow anyone with the anon key to read their history and insert new attempts.

-- Allow anyone to read past quiz attempts
CREATE POLICY "Allow anonymous select on quiz_attempts"
ON public.quiz_attempts
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow anyone to insert a newly completed quiz
CREATE POLICY "Allow anonymous insert on quiz_attempts"
ON public.quiz_attempts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
