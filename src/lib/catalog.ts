import { createClient } from '@/lib/supabase/server';

export async function getBanners() {
  const s = await createClient();
  const { data } = await s.from('home_banners').select('*').eq('enabled', true).order('sort_order').order('created_at', { ascending: false });
  return data ?? [];
}

export async function getKoonAnime(id: number) {
  const s = await createClient();
  const { data } = await s.from('anime').select('*').eq('id', id).maybeSingle();
  return data;
}

export async function getEpisodes(id: number) {
  const s = await createClient();
  const { data } = await s.from('episodes').select('*,episode_sources(*)').eq('anime_id', id).order('number');
  return data ?? [];
}

export async function getEpisode(id: string) {
  const s = await createClient();
  const { data } = await s.from('episodes').select('*,episode_sources(*)').eq('id', id).maybeSingle();
  return data;
}

export async function getAnimeWithEpisodes(id: number) {
  const [anime, episodes] = await Promise.all([getKoonAnime(id), getEpisodes(id)]);
  return { anime, episodes };
}
