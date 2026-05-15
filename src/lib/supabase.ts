import { createClient } from '@supabase/supabase-js'

// Try standard Vite env first, then fall back to process.env (injected by EnvironmentPlugin)
const supabaseUrl = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

// Create a dummy client or null if keys are missing to prevent top-level crash
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as ReturnType<typeof createClient>
