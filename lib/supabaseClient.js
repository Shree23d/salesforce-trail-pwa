import { createClient } from '@supabase/supabase-js';

// Read the public environment variables from Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if valid keys are configured (avoiding placeholder strings)
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseAnonKey.includes('paste-your') &&
  supabaseUrl.startsWith('https://')
);

// Create a single Supabase client instance to be reused across the application
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Saves a completed quiz session into Supabase.
 * If Supabase is not yet configured, gracefully logs and saves to localStorage fallback.
 */
export async function saveQuizAttempt({ topic, difficulty, score, totalQuestions = 7, questionsData }) {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('[Supabase] Client not configured. Quiz saved locally only.');
    return { data: null, error: new Error('Supabase keys not configured in .env.local') };
  }

  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert([
        {
          topic,
          difficulty,
          score,
          total_questions: totalQuestions,
          questions_data: questionsData,
        },
      ]);

    if (error) throw error;
    return { data: true, error: null };
  } catch (err) {
    console.error('[Supabase] Error saving quiz attempt:', err);
    return { data: null, error: err };
  }
}

/**
 * Fetches recent quiz attempts from Supabase ordered by latest first.
 */
export async function fetchQuizHistory(limit = 20) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: [], error: new Error('Supabase keys not configured') };
  }

  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('[Supabase] Error fetching history:', err);
    return { data: [], error: err };
  }
}
