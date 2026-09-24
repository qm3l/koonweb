'use client';
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/browser';
export function WatchProgress({ episodeId }: { episodeId: string }) {
  useEffect(() => {
    const video = document.querySelector('video'); if (!video) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let initialPosition = 0;
    const load = async () => { const s = createClient(); const { data: { user } } = await s.auth.getUser(); if (!user) return; const { data } = await s.from('watch_history').select('position_seconds').eq('user_id', user.id).eq('episode_id', episodeId).maybeSingle(); if (data?.position_seconds && data.position_seconds > 8) initialPosition = data.position_seconds; };
    const save = async () => { const s = createClient(); const { data: { user } } = await s.auth.getUser(); if (!user || !Number.isFinite(video.duration) || video.duration <= 0) return; await s.from('watch_history').upsert({ user_id: user.id, episode_id: episodeId, position_seconds: Math.floor(video.currentTime), duration_seconds: Math.floor(video.duration), updated_at: new Date().toISOString() }); };
    const onLoaded = () => { if (initialPosition > 0 && video.currentTime < 2) video.currentTime = Math.min(initialPosition, Math.max(0, video.duration - 5)); };
    const onTime = () => { if (timer) clearTimeout(timer); timer = setTimeout(save, 1400); };
    video.addEventListener('loadedmetadata', onLoaded); video.addEventListener('timeupdate', onTime); void load();
    return () => { if (timer) clearTimeout(timer); video.removeEventListener('loadedmetadata', onLoaded); video.removeEventListener('timeupdate', onTime); void save(); };
  }, [episodeId]);
  return null;
}
