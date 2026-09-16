-- ==============================================================================
-- SALESFORCE MCQ PWA - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this SQL in your Supabase Dashboard:
-- 1. Go to https://supabase.com/dashboard and select your project
-- 2. Click "SQL Editor" on the left sidebar
-- 3. Click "New Query", paste this entire script, and click "Run" (▶)
-- ==============================================================================

-- 1. Create the quiz_attempts table
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    -- id: Unique identifier generated automatically using UUID v4
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- created_at: Captures the exact timestamp when the quiz was finished
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- topic: Which domain or subtopic was practiced
    -- e.g. "Apex: Section 3: Primitive Data Types" or "Security & Access"
    topic TEXT NOT NULL,

    -- difficulty: "Beginner", "Intermediate", or "Tricky Scenario"
    difficulty TEXT NOT NULL,

    -- score: Questions answered correctly (0 to 7)
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 7),

    -- total_questions: Always 7
    total_questions INTEGER NOT NULL DEFAULT 7,

    -- questions_data: JSONB storing full snapshot of questions, user picks, and explanations
    questions_data JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 2. Index on created_at for fast descending history queries
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at 
ON public.quiz_attempts (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- 4. Clean up existing policies if re-running (Prevents "policy already exists" errors)
DROP POLICY IF EXISTS "Allow anonymous select on quiz_attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Allow anonymous insert on quiz_attempts" ON public.quiz_attempts;

-- 5. Create Policies for Public / Anonymous Access
-- Allows the PWA to read past attempts
CREATE POLICY "Allow anonymous select on quiz_attempts"
ON public.quiz_attempts
FOR SELECT
TO anon, authenticated
USING (true);

-- Allows the PWA to save completed quizzes
CREATE POLICY "Allow anonymous insert on quiz_attempts"
ON public.quiz_attempts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
