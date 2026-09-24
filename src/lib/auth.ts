import { createClient } from '@/lib/supabase/server';
export async function getUser(){ const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); return user; }
export async function getProfile(){ const supabase=await createClient(); const user=await getUser(); if(!user) return null; const {data}=await supabase.from('profiles').select('*').eq('id',user.id).single(); return data; }
export async function requireStaff(){ const profile=await getProfile(); if(!profile || !['admin','editor'].includes(profile.role)) return null; return profile; }
