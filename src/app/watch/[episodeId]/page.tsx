import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEpisode, getEpisodes } from '@/lib/catalog';
import { getAnimeDetails } from '@/lib/anilist';
import { VideoPlayer } from '@/components/player/VideoPlayer';
import { WatchProgress } from '@/components/player/WatchProgress';

export default async function WatchPage({ params }: { params: { episodeId: string } }) {
  const episode = await getEpisode(params.episodeId); if (!episode) notFound();
  const [anime, episodes] = await Promise.all([getAnimeDetails(Number(episode.anime_id)), getEpisodes(Number(episode.anime_id))]); if (!anime) notFound();
  const sources = (episode.episode_sources || []).filter((s:any) => s.enabled).sort((a:any,b:any) => a.priority-b.priority);
  const currentIndex = episodes.findIndex((x:any) => x.id === episode.id); const previous = currentIndex > 0 ? episodes[currentIndex - 1] : null; const next = currentIndex >= 0 && currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null;
  return <div className="koon-shell min-h-screen pb-32"><div className="koon-container pt-6">
    <div className="mb-5 flex items-center justify-between gap-3"><Link href={`/anime/${episode.anime_id}`} className="koon-btn secondary">← {anime.title}</Link><span className="font-mono text-[10px] text-koon-cyan">EP {String(episode.number).padStart(2,'0')} / {episodes.length}</span></div>
    {sources.length ? <><VideoPlayer sources={sources} title={anime.title} episodeNumber={episode.number}/><WatchProgress episodeId={episode.id}/><div className="mt-5 flex items-center justify-between gap-3"><div>{previous && <Link href={`/watch/${previous.id}`} className="koon-btn secondary">← السابقة</Link>}</div><div>{next && <Link href={`/watch/${next.id}`} className="koon-btn primary">التالية →</Link>}</div></div><section className="section"><div className="section-head"><div className="section-title"><div><small>EPISODE QUEUE</small><h2>قائمة الحلقات</h2></div></div></div><div className="flex gap-2 overflow-x-auto pb-2">{episodes.map((ep:any)=><Link key={ep.id} href={`/watch/${ep.id}`} className={`min-w-[76px] border px-3 py-3 text-center font-mono text-[10px] ${ep.id===episode.id?'border-koon-lime bg-koon-lime/10 text-koon-lime':'border-white/10 text-koon-muted hover:border-white/30'}`}>{ep.number}</Link>)}</div></section></> : <div className="koon-panel p-12 text-center"><p className="text-sm text-white/60">لا يوجد مصدر بث فعال لهذه الحلقة حاليًا.</p><Link href={`/anime/${episode.anime_id}`} className="mt-5 inline-flex koon-btn secondary">العودة للعمل</Link></div>}
  </div></div>;
}
