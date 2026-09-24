import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAnimeDetails } from '@/lib/anilist';
import { getEpisodes } from '@/lib/catalog';
import { FavoriteButton } from '@/components/anime/FavoriteButton';

export default async function AnimeDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id); if (!Number.isFinite(id)) notFound();
  const [anime, episodes] = await Promise.all([getAnimeDetails(id), getEpisodes(id)]);
  if (!anime) notFound();
  const title = anime.title; const description = (anime.description || 'لا يوجد وصف متاح لهذا العمل.').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return <div className="koon-shell min-h-screen pb-32">
    <section className="detail-backdrop"><img src={anime.bannerImage || anime.coverImage} alt="" /><div className="koon-container detail-content"><Link href="/search" className="koon-btn secondary mb-8">← العودة للاستكشاف</Link><div className="flex flex-col gap-7 md:flex-row md:items-end"><img src={anime.coverImage} alt={title} className="poster" /><div className="max-w-3xl pb-2"><div className="hero-kicker">KOON / WORK {anime.id}</div><h1 className="mt-2 text-4xl font-black tracking-tight sm:text-6xl">{title}</h1><div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono text-koon-muted"><span>{anime.format}</span><span>•</span><span>{anime.year || '—'}</span><span>•</span><span>★ {anime.score}</span>{anime.duration && <><span>•</span><span>{anime.duration} MIN</span></>}</div><p className="mt-5 max-w-2xl text-sm leading-7 text-[#9ca7b7]">{description}</p><div className="mt-5 flex gap-2"><FavoriteButton animeId={anime.id} /><Link href={episodes[0] ? `/watch/${episodes[0].id}` : '#'} className={`koon-btn primary ${episodes.length ? '' : 'pointer-events-none opacity-40'}`}>مشاهدة الحلقة الأولى</Link></div></div></div></div></section>
    <main className="koon-container">
      <section className="section"><div className="section-head"><div className="section-title"><div><small>EPISODE ARCHIVE</small><h2>الحلقات</h2></div></div><span className="text-[9px] font-mono text-koon-muted">{episodes.length} AVAILABLE</span></div>
      {episodes.length ? <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{episodes.map((ep: any) => <Link key={ep.id} href={`/watch/${ep.id}`} className="koon-panel flex items-center justify-between gap-4 p-4 transition hover:border-koon-cyan/40"><div><span className="font-mono text-[10px] text-koon-cyan">EP {String(ep.number).padStart(2,'0')}</span><h3 className="mt-1 text-sm font-bold">{ep.title || `الحلقة ${ep.number}`}</h3></div><span className="text-xs text-koon-muted">{(ep.episode_sources || []).filter((s:any)=>s.enabled).length} مصادر ›</span></Link>)}</div> : <div className="koon-panel p-10 text-center text-sm text-koon-muted">لا توجد حلقات مرتبطة بهذا العمل في Koon حتى الآن.</div>}
      </section>
    </main>
  </div>;
}
