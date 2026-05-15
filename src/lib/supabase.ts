import { createClient } from '@supabase/supabase-js'

// Aggressive search for env vars across different environments (Vite/Node/SSR)
const getEnv = (name: string) => {
  return (import.meta.env as any)[name] || 
         (import.meta.env as any)[`VITE_${name}`] ||
         (globalThis as any).process?.env?.[name] ||
         (globalThis as any).process?.env?.[`VITE_${name}`]
}

const supabaseUrl = getEnv('SUPABASE_URL')
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY')

console.log("Supabase Init:", { 
  hasUrl: !!supabaseUrl, 
  hasKey: !!supabaseAnonKey,
  urlStart: supabaseUrl?.slice(0, 15),
  envKeys: Object.keys(import.meta.env).filter(k => k.includes('SUPABASE'))
});

// Create a dummy client or null if keys are missing to prevent top-level crash
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as ReturnType<typeof createClient>
