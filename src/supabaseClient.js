import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Stop early with a clear message if .env.local is missing or misnamed
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase settings. Check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)