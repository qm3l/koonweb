'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from './Icons';

export function SciFiSearch({ onSearch, initialValue = '' }: { onSearch?: (query: string) => void; initialValue?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);
  useEffect(() => { const handler = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); document.getElementById('koon-search')?.focus(); } }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler); }, []);
  function submit(e: FormEvent) { e.preventDefault(); const value = query.trim(); if (onSearch) onSearch(value); else router.push(value ? `/search?q=${encodeURIComponent(value)}` : '/search'); }
  return <form onSubmit={submit} className="koon-search-wrap">
    <div className="koon-search-corner" />
    <SearchIcon size={19} className="text-koon-cyan shrink-0" />
    <input id="koon-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث عن عمل، شخصية أو تصنيف..." aria-label="البحث" />
    <kbd>⌘ K</kbd>
    <button type="submit">بحث</button>
  </form>;
}
