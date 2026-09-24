import Link from 'next/link';
import { getUser,getProfile } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export default async function LibraryPage(){
  const user=await getUser();
  if(!user) return <div className="px-4 py-16 text-center"><h1 className="text-2xl font-bold">مكتبتي</h1><p className="text-koon-muted mt-2">سجّل الدخول حتى تبقى مكتبتك معك.</p><Link href="/login" className="inline-block mt-6 polygon-btn bg-koon-cyan text-black px-6 py-3 font-bold">تسجيل الدخول</Link></div>;
  const s=await createClient();
  const [{data:favorites},{data:history}]=await Promise.all([
    s.from('favorites').select('anime_id,created_at,anime(title,cover_url)').eq('user_id',user.id).order('created_at',{ascending:false}),
    s.from('watch_history').select('episode_id,position_seconds,duration_seconds,updated_at,episodes(number,anime_id,anime(title,cover_url))').eq('user_id',user.id).order('updated_at',{ascending:false})
  ]);
  return <div className="px-4 py-8 space-y-8">
    <header className="text-right"><p className="text-[10px] font-mono text-koon-cyan">KOON / LIBRARY</p><h1 className="text-2xl font-bold mt-1">مكتبتي</h1><p className="text-sm text-koon-muted mt-1">كل ما تحفظه أو تتابعه، محفوظ بحسابك.</p></header>
    <section className="space-y-3"><div className="flex justify-between items-center"><h2 className="font-bold">المفضلة</h2><span className="text-xs text-koon-muted">{favorites?.length||0} عمل</span></div>{favorites?.length?<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">{favorites.map((f:any)=><Link key={f.anime_id} href={`/anime/${f.anime_id}`} className="koon-card p-2"><div className="aspect-[3/4] bg-black/30 rounded-lg overflow-hidden"><img src={f.anime?.cover_url || ''} alt={f.anime?.title || ''} className="w-full h-full object-cover" loading="lazy"/></div><p className="text-xs mt-2 text-center line-clamp-1">{f.anime?.title || `عمل #${f.anime_id}`}</p></Link>)}</div>:<div className="koon-panel p-8 text-center text-sm text-koon-muted">لا توجد أعمال في المفضلة بعد.</div>}</section>
    <section className="space-y-3"><div className="flex justify-between items-center"><h2 className="font-bold">متابعة المشاهدة</h2><span className="text-xs text-koon-muted">{history?.length||0} حلقة</span></div>{history?.length?<div className="space-y-2">{history.map((h:any)=><Link key={h.episode_id} href={`/watch/${h.episode_id}`} className="koon-panel p-4 flex items-center justify-between gap-3 hover:border-koon-cyan/40"><div className="text-right"><b className="text-sm">{h.episodes?.anime?.title||`عمل #${h.episodes?.anime_id}`}</b><p className="text-xs text-koon-lime mt-1">حلقة {h.episodes?.number} • {h.duration_seconds?Math.round(h.position_seconds/h.duration_seconds*100):0}%</p></div><span className="text-xs text-koon-cyan">متابعة ←</span></Link>)}</div>:<div className="koon-panel p-8 text-center text-sm text-koon-muted">سجل المشاهدة فارغ حاليًا.</div>}</section>
  </div>;
}
