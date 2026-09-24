import React from 'react';
import { Play, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative w-full rounded-2xl glass-panel p-6 md:p-8 overflow-hidden border border-koon-border shadow-glass mb-8">
      {/* تأثير خلفية مضيئة متدرجة داخل البانر */}
      <div className="absolute inset-0 bg-gradient-to-r from-koon-purple/20 via-transparent to-koon-neonBlue/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* تفاصيل العمل */}
        <div className="max-w-xl">
          <div className="inline-block px-3 py-1 rounded-full bg-koon-purple/30 border border-koon-purple/50 text-koon-neonBlue text-xs font-semibold mb-4">
            مستمر الآن
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-3 text-white">
            Solo Leveling
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
            عالم جديد.. قوة جديدة.. بداية أسطورة. رحلة صونغ جين وو في وجه أقوى الوحوش لاستكشاف أسرار البوابة.
          </p>

          {/* معلومات إضافية وأزرار التفاعل */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-koon-purple to-koon-neonBlue text-white font-bold shadow-neon hover:opacity-90 transition-all">
              <Play size={18} fill="white" />
              <span>مشاهدة الآن</span>
            </button>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-3 rounded-xl border border-white/5">
              <Star size={18} className="text-yellow-400" fill="#FACC15" />
              <span className="font-bold text-sm">9.1</span>
              <span className="text-xs text-gray-400">2024</span>
              <span className="text-xs text-koon-neonBlue bg-koon-neonBlue/10 px-2 py-0.5 rounded ml-2">12 حلقة</span>
            </div>
          </div>
        </div>

        {/* إحصائيات سريعة أسفل البانر أو جانبه */}
        <div className="flex md:flex-col gap-4 w-full md:w-auto justify-around border-t md:border-t-0 md:border-r border-koon-border pt-4 md:pt-0 md:pr-6">
          <div className="text-center md:text-right">
            <p className="text-2xl md:text-3xl font-extrabold text-koon-neonBlue">12K+</p>
            <p className="text-xs text-gray-400">أنمي متاح</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-2xl md:text-3xl font-extrabold text-white">500K+</p>
            <p className="text-xs text-gray-400">حلقة مترجمة</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-2xl md:text-3xl font-extrabold text-purple-400">4K</p>
            <p className="text-xs text-gray-400">جودة البث</p>
          </div>
        </div>
      </div>
    </div>
  );
}
