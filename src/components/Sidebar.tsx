import React from 'react';
import { Home, Search, Star, Bookmark, Heart, Settings } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: Home, label: 'الرئيسية', active: true },
    { icon: Search, label: 'بحث', active: false },
    { icon: Star, label: 'مميز', active: false },
    { icon: Bookmark, label: 'مكتبة', active: false },
    { icon: Heart, label: 'المفضلة', active: false },
    { icon: Settings, label: 'إعدادات', active: false },
  ];

  return (
    <aside className="w-20 lg:w-64 h-screen glass-panel flex flex-col justify-between p-4 sticky top-0 border-r border-koon-border">
      {/* شعار المنصة */}
      <div className="flex items-center gap-3 px-2 py-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-koon-purple to-koon-neonBlue flex items-center justify-center font-bold text-xl shadow-neon">
          K
        </div>
        <span className="hidden lg:inline font-bold text-lg tracking-wider">Koon</span>
      </div>

      {/* القائمة الرئيسية */}
      <nav className="flex flex-col gap-2 my-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 ${
                item.active
                  ? 'bg-koon-purple/20 text-koon-neonBlue border border-koon-purple/40 shadow-neon'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={22} />
              <span className="hidden lg:inline text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* قسم البروفाइल المصغر */}
      <div className="pt-4 border-t border-koon-border flex items-center gap-3 px-2">
        <div className="w-9 h-9 rounded-full bg-koon-purple/30 border border-koon-purple flex items-center justify-center text-sm font-bold">
          M
        </div>
        <div className="hidden lg:block overflow-hidden">
          <p className="text-xs font-semibold truncate">Mohammed</p>
          <p className="text-[10px] text-gray-400 truncate">@koon_user</p>
        </div>
      </div>
    </aside>
  );
}
