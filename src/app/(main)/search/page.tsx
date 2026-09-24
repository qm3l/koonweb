'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SciFiSearch } from '@/components/ui/SciFiSearch';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { AnimeItem } from '@/lib/anilist';

const GENRES = [
  { id: 'all', name: 'الكل' },
  { id: 'action', name: 'أكشن' },
  { id: 'fantasy', name: 'فانتازيا' },
  { id: 'scifi', name: 'خيال علمي' },
  { id: 'comedy', name: 'كوميديا' },
  { id: 'drama', name: 'دراما' },
  { id: 'romance', name: 'رومانسي' },
];

function SearchContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState(params.get('q') || '');
  const [results, setResults] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const query = `
        query ($search: String, $genre: String) {
          Page(perPage: 18) {
            media(type: ANIME, search: $search, genre: $genre, sort: POPULARITY_DESC) {
              id
              title { english romaji native }
              coverImage { extraLarge }
              bannerImage
              averageScore
              status
              episodes
              nextAiringEpisode { episode }
              format
              genres
            }
          }
        }
        `;

        const res = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query,
            variables: { search: searchQuery || undefined, genre: selectedGenre === 'all' ? undefined : ({action:'Action',fantasy:'Fantasy',scifi:'Sci-Fi',comedy:'Comedy',drama:'Drama',romance:'Romance'} as Record<string,string>)[selectedGenre] },
          }),
        });

        const data = await res.json();
        const mediaList = data?.data?.Page?.media || [];

        const mapped: AnimeItem[] = mediaList.map((item: any) => {
          const total = item.episodes || '?';
          let current = total;
          if (item.status === 'RELEASING' && item.nextAiringEpisode) {
            current = item.nextAiringEpisode.episode - 1;
          }
          return {
            id: item.id,
            title: item.title.english || item.title.romaji || item.title.native,
            coverImage: item.coverImage.extraLarge,
            bannerImage: item.bannerImage,
            score: item.averageScore ? (item.averageScore / 10).toFixed(1) : 'N/A',
            status: item.status,
            currentEpisode: current,
            totalEpisodes: total,
            format: item.format || 'TV',
            genres: item.genres || [],
          };
        });

        setResults(mapped);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchSearch();
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedGenre]);

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="space-y-1 text-right">
        <h1 className="text-xl font-bold text-white font-sans">مسبار البحث والتصفية</h1>
        <p className="text-xs text-koon-muted font-sans">ابحث بالاسم، التصنيف، أو أحدث الإصدارات</p>
      </div>

      <SciFiSearch onSearch={(q) => { setSearchQuery(q); router.replace(q ? `/search?q=${encodeURIComponent(q)}` : '/search'); }} initialValue={searchQuery} />

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none dir-rtl">
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`polygon-btn px-4 py-2 text-xs font-mono whitespace-nowrap transition-all ${
              selectedGenre === genre.id
                ? 'bg-koon-cyan text-black font-semibold'
                : 'glass-panel text-gray-300 hover:text-white border-white/5'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-koon-muted">
          <span>نتائج البحث</span>
          <span>{loading ? 'جاري الفحص...' : `${results.length} نتيجة`}</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="polygon-card aspect-[3/4] bg-koon-surface/50 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {results.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-koon-muted">جاري التحميل...</div>}>
      <SearchContent />
    </Suspense>
  );
}
