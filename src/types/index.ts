// تعريفات بيانات الأنمي
export interface Anime {
  id: number;
  title: string;
  coverImage: string;
  bannerImage: string | null;
  score: number | string;
  status: 'RELEASING' | 'FINISHED' | 'NOT_YET_RELEASED' | string;
  currentEpisode: number | string;
  totalEpisodes: number | string;
  format: string;
  genres: string[];
  description?: string;
  seasonYear?: number;
}

// تعريف عنصر سجل المشاهدة
export interface HistoryItem {
  animeId: number;
  animeTitle: string;
  coverImage: string;
  episodeNumber: number;
  progressSeconds: number;
  durationSeconds: number;
  updatedAt: number;
}

// تعريف سيرفرات البث
export interface StreamServer {
  id: string;
  name: string;
  quality?: string;
  active: boolean;
}

// تعريف استجابة ملف البث
export interface StreamResponse {
  success: boolean;
  animeId: string;
  episodeNumber: string;
  streamUrl: string;
  quality: string;
  servers: StreamServer[];
}

// تعريف بيانات مستخدم تيليجرام
export interface TelegramUser {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  photoUrl?: string;
}
