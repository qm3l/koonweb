import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/HeroSection';
import SearchFilter from '@/components/SearchFilter';
import SubPages from '@/components/SubPages';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-koon-bg text-white koon-radial-glow">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <HeroSection />
        <SearchFilter />
        <SubPages />
      </main>
    </div>
  );
}
