import { fetchArticles, fetchCategories } from '@/lib/api';
import BreakingNews from '@/components/BreakingNews';
import HeroSection from '@/components/HeroSection';
import LatestNewsGrid from '@/components/LatestNewsGrid';
import TrendingSidebar from '@/components/TrendingSidebar';
import NewsletterBox from '@/components/NewsletterBox';

export const revalidate = 30; // ISR revalidate every 30s

export default async function HomePage() {
  const articles = await fetchArticles();
  const categories = await fetchCategories();
  const breakingArticles = articles.filter(a => a.is_breaking);

  return (
    <div className="space-y-8">
      {/* Breaking News Ticker */}
      <BreakingNews articles={breakingArticles.length > 0 ? breakingArticles : articles} />

      {/* Main Hero Stories */}
      <HeroSection articles={articles} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main News Feed (2 Cols) */}
          <div className="lg:col-span-2 space-y-10">
            <LatestNewsGrid articles={articles} categories={categories} />
            <NewsletterBox />
          </div>

          {/* Sidebar (1 Col) */}
          <div className="space-y-8">
            <TrendingSidebar articles={articles} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
