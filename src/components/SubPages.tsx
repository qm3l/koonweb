import React from 'react';
import { Download, Settings, Moon, Sun } from 'lucide-react';

export default function SubPages() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* صفحة التحميلات */}
      <div className="glass-panel p-6 rounded-2xl border border-koon-border shadow-glass">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-koon-neonBlue font-semibold text-sm">
            <Download size={18} />
            <span>صفحة التحميلات</span>
          </div>
          <span className="text-xs px-2 py-1 rounded bg-koon-purple/20 text-purple-300">جاري التحميل</span>
        </div>
        <div className="space-y-3">
          <div className="bg-black/40 p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Solo Leveling - 12</p>
              <p className="text-xs text-gray-400">800 MB / 1.8 GB</p>
            </div>
            <span className="text-xs text-koon-neonBlue font-semibold">67%</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">تحميل بجودة عالية ومتابعة التقدم.</p>
      </div>

      {/* قسم الإعدادات ومظهر التطبيق */}
      <div className="glass-panel p-6 rounded-2xl border border-koon-border shadow-glass">
        <div className="flex items-center gap-2 mb-4 text-purple-400 font-semibold text-sm">
          <Settings size={18} />
          <span>الإعدادات ومظهر التطبيق</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-xl bg-koon-purple/20 border border-koon-purple/40 text-center cursor-pointer">
            <Moon size={20} className="mx-auto mb-1 text-koon-neonBlue" />
            <span className="text-xs font-bold">داكن (فخم)</span>
          </div>
          <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-center cursor-pointer opacity-50">
            <Sun size={20} className="mx-auto mb-1 text-gray-400" />
            <span className="text-xs font-bold text-gray-400">فاتح</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">تحكم كامل في تجربتك ومظهر المنصة.</p>
      </div>
    </div>
  );
}
