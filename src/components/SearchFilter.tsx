import React from 'react';
import { Search, SlidersHorizontal, Filter } from 'lucide-react';

export default function SearchFilter() {
  const genres = ['أكشن', 'مغامرة', 'دراما', 'كوميديا', 'خيال علمي', 'رومانسي', 'فانتازيا'];
  const statuses = ['مستمر', 'مكتمل', 'قادم'];
  const qualities = ['4K', '1080p', '720p'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* صندوق صفحة البحث */}
      <div className="glass-panel p-6 rounded-2xl border border-koon-border shadow-glass">
        <div className="flex items-center gap-2 mb-4 text-koon-neonBlue font-semibold text-sm">
          <Search size={18} />
          <span>صفحة البحث الذكي</span>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="ابحث عن أنمي، شخصية، أو تصنيف..."
            className="w-full bg-black/40 border border-koon-border rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-koon-purple transition-all"
          />
          <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
        </div>
        <p className="text-xs text-gray-400">حقل البحث بتصميم مميز مع اقتراحات ذكية وسريعة.</p>
      </div>

      {/* صندوق صفحة الفلترة */}
      <div className="glass-panel p-6 rounded-2xl border border-koon-border shadow-glass">
        <div className="flex items-center gap-2 mb-4 text-purple-400 font-semibold text-sm">
          <SlidersHorizontal size={18} />
          <span>صفحة الفلترة المتقدمة</span>
        </div>
        
        {/* التصنيفات المصغرة */}
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.slice(0, 5).map((genre, idx) => (
            <span key={idx} className="px-3 py-1 rounded-lg bg-koon-purple/20 border border-koon-purple/30 text-xs text-gray-200">
              {genre}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400">فلاتر متقدمة لتجد ما يناسبك بسرعة ودقة عالية.</p>
      </div>
    </div>
  );
}
