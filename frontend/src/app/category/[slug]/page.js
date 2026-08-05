import { fetchArticles, fetchCategories } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import TrendingSidebar from '@/components/TrendingSidebar';
import { Tag } from 'lucide-react';

export async function generateMetadata({ params }) {
  const categoryName = params.slug.toUpperCase();
  return {
    title: `Berita ${categoryName} Terkini - PORTALBERITA`,
    description: `Kumpulan berita ${params.slug} terbaru dan terpercaya.`,
  };
}

export default async function CategoryPage({ params }) {
  const articles = await fetchArticles({ category: params.slug });
  const allArticles = await fetchArticles();
  const categories = await fetchCategories();
  
  const currentCategory = categories.find(c => c.slug === params.slug) || { name: params.slug, color: '#3b82f6' };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8">
      {/* Category Header */}
      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className="p-3 rounded-xl text-white shadow-md" style={{ backgroundColor: currentCategory.color || '#3b82f6' }}>
          <Tag className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Arsip Kategori</span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white capitalize">
            Berita {currentCategory.name}
          </h1>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* News Grid (2 Cols) */}
        <div className="lg:col-span-2">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 font-medium">Belum ada berita untuk kategori ini saat ini.</p>
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
