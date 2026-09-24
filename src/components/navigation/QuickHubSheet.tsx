'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickHubSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const hubItems = [
  { id: 'schedule', title: 'جدول العرض', subtitle: 'مواعيد نزول الحلقات اليومية', icon: '📅', color: 'border-cyan-500/30' },
  { id: 'latest', title: 'أحدث الحلقات', subtitle: 'الإضافات الجديدة فور رفعها', icon: '⚡', color: 'border-lime-500/30' },
  { id: 'downloads', title: 'التحميلات', subtitle: 'الحلقات المحفوظة أوفلاين', icon: '📥', color: 'border-blue-500/30' },
  { id: 'history', title: 'سجل المشاهدة', subtitle: 'متابعة من حيث توقفت', icon: '🕒', color: 'border-purple-500/30' },
  { id: 'request', title: 'طلب أنمي', subtitle: 'إرسال اقتراح أنمي جديد', icon: '💬', color: 'border-pink-500/30' },
];

export const QuickHubSheet: React.FC<QuickHubSheetProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* الخلفية المظلمة المعتمة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* الستارة الزجاجية المنزلقة */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 glass-panel rounded-t-3xl p-5 pb-8 border-t border-koon-cyan/30 max-w-lg mx-auto"
          >
            {/* مقبض السحب الأعلى */}
            <div className="w-12 h-1 bg-gray-600/50 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-koon-cyan animate-pulse" />
                المكعب التفاعلي (Quick Hub)
              </h3>
              <button
                onClick={onClose}
                className="text-xs text-koon-muted hover:text-white px-2 py-1 rounded bg-white/5"
              >
                إغلاق
              </button>
            </div>

            {/* شبكة خيارات الاختصارات */}
            <div className="grid grid-cols-1 gap-2.5">
              {hubItems.map((item) => (
                <button
                  key={item.id}
                  onClick={onClose}
                  className={`flex items-center gap-3.5 p-3 rounded-2xl bg-koon-surface/80 border ${item.color} hover:bg-koon-surface transition-all text-right group`}
                >
                  <span className="text-2xl p-2 rounded-xl bg-black/40">{item.icon}</span>
                  <div>
                    <h4 className="text-sm font-medium text-gray-200 group-hover:text-koon-cyan transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-koon-muted">{item.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
