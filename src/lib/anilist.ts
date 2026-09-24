export interface AnimeItem {
  id: number;
  title: string;
  coverImage: string;
  bannerImage: string | null;
  score: number | string;
  status: string;
  currentEpisode: number | string;
  totalEpisodes: number | string;
  format: string;
  genres: string[];
}

export interface AnimeDetails extends AnimeItem {
  titleNative: string | null;
  description: string | null;
  duration: number | null;
  season: string | null;
  year: number | null;
  studios: string[];
  synonyms: string[];
}

const ANILIST_GRAPHQL_URL = 'https://graphql.anilist.co';

const ITEM_FIELDS = `
  id title { english romaji native }
  coverImage { extraLarge }
  bannerImage averageScore status episodes
  nextAiringEpisode { episode }
  format genres
`;

async function queryAniList<T>(query: string, variables: Record<string, unknown>, revalidate = 1800): Promise<T | null> {
  try {
    const response = await fetch(ANILIST_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    });
    if (!response.ok) return null;
    const json = await response.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

function mapAnime(item: any): AnimeItem {
  const total = item.episodes || '?';
  let current: number | string = total;
  if (item.status === 'RELEASING' && item.nextAiringEpisode) current = item.nextAiringEpisode.episode - 1;
  if (item.status === 'NOT_YET_RELEASED') current = 0;
  return {
    id: item.id,
    title: item.title?.english || item.title?.romaji || item.title?.native || 'بدون عنوان',
    coverImage: item.coverImage?.extraLarge || '',
    bannerImage: item.bannerImage || null,
    score: item.averageScore ? (item.averageScore / 10).toFixed(1) : '—',
    status: item.status || 'UNKNOWN',
    currentEpisode: current,
    totalEpisodes: total,
    format: item.format || 'TV',
    genres: item.genres || [],
  };
}

const LIST_QUERY = `query ($page:Int,$perPage:Int,$sort:[MediaSort],$search:String,$genre:String) {
  Page(page:$page,perPage:$perPage) { media(type:ANIME,sort:$sort,search:$search,genre:$genre) { ${ITEM_FIELDS} } }
}`;

export async function getPopularAnime(page = 1, perPage = 12) {
  const data = await queryAniList<any>(LIST_QUERY, { page, perPage, sort: ['POPULARITY_DESC'] });
  return (data?.Page?.media || []).map(mapAnime) as AnimeItem[];
}

export async function getTrendingAnime(page = 1, perPage = 12) {
  const data = await queryAniList<any>(LIST_QUERY, { page, perPage, sort: ['TRENDING_DESC'] });
  return (data?.Page?.media || []).map(mapAnime) as AnimeItem[];
}

export async function getLatestAnime(page = 1, perPage = 12) {
  const data = await queryAniList<any>(LIST_QUERY, { page, perPage, sort: ['START_DATE_DESC'] });
  return (data?.Page?.media || []).map(mapAnime) as AnimeItem[];
}

export async function getAnimeDetails(id: number): Promise<AnimeDetails | null> {
  const query = `query($id:Int){ Media(id:$id,type:ANIME) { ${ITEM_FIELDS}
    description duration season seasonYear synonyms
    studios(isMain:true){nodes{name}}
  }}`;
  const data = await queryAniList<any>(query, { id }, 3600);
  const item = data?.Media;
  if (!item) return null;
  const base = mapAnime(item);
  return {
    ...base,
    titleNative: item.title?.native || null,
    description: item.description || null,
    duration: item.duration || null,
    season: item.season || null,
    year: item.seasonYear || null,
    studios: (item.studios?.nodes || []).map((x: any) => x.name),
    synonyms: item.synonyms || [],
  };
}

export function anilistImage(id: number) {
  return `https://img.anili.st/media/${id}`;
}
