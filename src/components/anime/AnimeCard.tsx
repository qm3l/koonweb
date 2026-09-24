import Link from 'next/link';
import { AnimeItem } from '@/lib/anilist';

export function AnimeCard({ anime }: { anime: AnimeItem }) {
  const airing = anime.status === 'RELEASING';
  const episode = airing ? `EP ${anime.currentEpisode}/${anime.totalEpisodes}` : anime.totalEpisodes !== '?' ? `${anime.totalEpisodes} EP` : anime.status === 'NOT_YET_RELEASED' ? 'قريبًا' : '—';
  return (
    <Link href={`/anime/${anime.id}`} className="anime-card group">
      <article>
        <div className="anime-card-media">
          <img src={anime.coverImage} alt={anime.title} loading="lazy" />
          <div className="anime-card-scan" />
          <div className="anime-card-top"><span>{episode}</span>{anime.score !== '—' && <span>★ {anime.score}</span>}</div>
          <div className="anime-card-bottom"><span>{anime.format}</span></div>
        </div>
        <div className="anime-card-info">
          <h3>{anime.title}</h3>
          <p>{anime.genres.slice(0, 2).join(' · ') || 'أنمي'}</p>
        </div>
      </article>
    </Link>
  );
}
