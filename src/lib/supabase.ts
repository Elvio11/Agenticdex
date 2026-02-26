import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase env vars missing. Please see .env.local.example.');
}

// Anon key only. Service key is explicitly forbidden in frontend.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
