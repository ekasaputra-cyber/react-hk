// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wujjmgnruyqxmfyarteb.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 

if (!supabaseUrl) {
  throw new Error('Supabase URL tidak terdefinisi. Pastikan NEXT_PUBLIC_SUPABASE_URL sudah diatur di .env.local');
}
if (!supabaseKey) {
  throw new Error('Supabase Key tidak terdefinisi. Pastikan SUPABASE_KEY sudah diatur di .env.local');
}

// Anda bisa mengetikkan instance yang diekspor jika mau
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);