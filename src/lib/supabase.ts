import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a dummy client or null if keys are missing to prevent top-level crash
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as ReturnType<typeof createClient>

if (!supabase) {
  console.warn('Supabase credentials missing. Guestbook will not function.')
}
