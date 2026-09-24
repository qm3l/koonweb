import Link from 'next/link';
import { getLatestAnime, getPopularAnime, getTrendingAnime } from '@/lib/anilist';
import { getBanners } from '@/lib/catalog';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { SciFiSearch } from '@/components/ui/SciFiSearch';

function Section({ title, eyebrow, items }: { title: string; eyebrow: string; items: any[] }) {
  if (!items.length) return null;
  return <section className="section">
    <div className="section-head"><div className="section-title"><div><small>{eyebrow}</small><h2>{title}</h2></div></div><span className="text-[9px] font-mono text-koon-muted">{items.length} WORKS</span></div>
    <div className="anime-grid">{items.map(item => <AnimeCard key={item.id} anime={item} />)}</div>
  </section>;
}

export default async function HomePage() {
  const [banners, trending, popular, latest] = await Promise.all([
    getBanners(), getTrendingAnime(1, 12), getPopularAnime(1, 12), getLatestAnime(1, 12),
  ]);
  const hero = banners[0];
  return <div className="koon-shell pb-32">
    <div className="koon-container">
      <header className="koon-topbar"><Link href="/" className="koon-brand"><img src="/brand/koon-logo.png" alt="Koon" /></Link><div className="koon-live"><i /> SYSTEM ONLINE</div></header>
      <SciFiSearch />
      {hero ? <section className="hero">
        <img src={hero.image_url} alt={hero.title} />
        <div className="hero-content"><div><div className="hero-kicker">KOON / FEATURED TRANSMISSION</div><h1>{hero.title}</h1><p>{hero.subtitle || 'اكتشف عملك التالي، تابع حلقاتك، واحتفظ بكل ما يهمك في مكان واحد.'}</p><div className="hero-actions"><Link href={hero.href || (hero.anime_id ? `/anime/${hero.anime_id}` : '/search')} className="koon-btn primary">ابدأ المشاهدة</Link><Link href="/search" className="koon-btn secondary">استكشف الأعمال</Link></div></div></div>
      </section> : <section className="hero"><div className="hero-content"><div><div className="hero-kicker">KOON / ANIME DISCOVERY</div><h1>اكتشافك التالي يبدأ هنا.</h1><p>مساحة هادئة ومباشرة لاكتشاف الأنمي ومتابعة حلقاتك المحفوظة دون ازدحام.</p><div className="hero-actions"><Link href="/search" className="koon-btn primary">ابدأ الاستكشاف</Link></div></div></div></section>}
      <Section eyebrow="LIVE SIGNAL" title="يتصدر الآن" items={trending} />
      <Section eyebrow="KOON INDEX" title="الأكثر شهرة" items={popular} />
      <Section eyebrow="FRESH DATA" title="إصدارات حديثة" items={latest} />
    </div>
  </div>;
}
