import { createClient } from '@supabase/supabase-js'

// Try standard Vite env first, then fall back to process.env (injected by EnvironmentPlugin)
const supabaseUrl = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

console.log("Supabase Init:", { 
  hasUrl: !!supabaseUrl, 
  hasKey: !!supabaseAnonKey,
  urlStart: supabaseUrl?.slice(0, 15),
  envKeys: Object.keys(import.meta.env).filter(k => k.includes('SUPABASE')),
  processKeys: Object.keys(process.env || {}).filter(k => k.includes('SUPABASE'))
});

// Create a dummy client or null if keys are missing to prevent top-level crash
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as ReturnType<typeof createClient>
