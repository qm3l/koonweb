'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/ui/Icons';

export function BottomNav() {
  const pathname = usePathname();
  const items = [
    { label: 'الرئيسية', path: '/', icon: Icons.Home },
    { label: 'استكشف', path: '/search', icon: Icons.Search },
    { label: 'مكتبتي', path: '/library', icon: Icons.Bookmark },
    { label: 'حسابي', path: '/profile', icon: Icons.User },
  ];
  return <nav className="bottom-nav"><div className="flex items-center justify-around">
    {items.map(({ label, path, icon: Icon }) => { const active = path === '/' ? pathname === '/' : pathname.startsWith(path); return <Link key={path} href={path} className={`flex min-w-[64px] flex-col items-center gap-1 px-3 py-2 text-[9px] font-mono transition-colors ${active ? 'active text-koon-lime' : 'text-koon-muted hover:text-white'}`}><Icon className="h-5 w-5" />{label}</Link>; })}
  </div></nav>;
}
