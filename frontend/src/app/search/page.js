import { fetchArticles, fetchCategories } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import TrendingSidebar from '@/components/TrendingSidebar';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Hasil Pencarian Berita - PORTALBERITA',
};

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || '';
  const articles = query ? await fetchArticles({ search: query }) : [];
  const allArticles = await fetchArticles();
  const categories = await fetchCategories();

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8">
      {/* Search Header */}
      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md">
          <Search className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Hasil Pencarian</span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
            {query ? `Menampilkan hasil untuk: "${query}"` : 'Pencarian Berita'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ditemukan {articles.length} berita yang relevan
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Results (2 Cols) */}
        <div className="lg:col-span-2">
          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} horizontal={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
              <p className="text-slate-700 dark:text-slate-300 font-bold text-lg">Berita tidak ditemukan</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Coba kata kunci lain seperti "AI", "Ekonomi", "Timnas", atau "IKN".</p>
            </div>
          )}
        </div>

        {/* Sidebar (1 Col) */}
        <div className="space-y-8">
          <TrendingSidebar articles={allArticles} categories={categories} />
        </div>
      </div>
    </div>
  );
}
