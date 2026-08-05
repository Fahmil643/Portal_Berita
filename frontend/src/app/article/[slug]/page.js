import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchArticleBySlug, fetchArticles, fetchCategories } from '@/lib/api';
import CommentSection from '@/components/CommentSection';
import TrendingSidebar from '@/components/TrendingSidebar';
import { Clock, Eye, Calendar, User, Share2, ArrowLeft, Bookmark } from 'lucide-react';

export async function generateMetadata({ params }) {
  const article = await fetchArticleBySlug(params.slug);
  if (!article) return { title: 'Artikel Tidak Ditemukan' };

  return {
    title: `${article.title} - PORTALBERITA`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }) {
  const article = await fetchArticleBySlug(params.slug);
  if (!article) notFound();

  const allArticles = await fetchArticles();
  const categories = await fetchCategories();

  return (
    <article className="py-8 px-4 max-w-7xl mx-auto space-y-8">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Article Body (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <span
              className="inline-block px-3 py-1 text-xs font-bold text-white rounded-full uppercase"
              style={{ backgroundColor: article.category?.color || article.category_color || '#3b82f6' }}
            >
              {article.category?.name || article.category_name}
            </span>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight font-serif">
              {article.title}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
              {article.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-200">
                  <User className="w-4 h-4 text-blue-600" />
                  {article.author_name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.published_at || Date.now()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.read_time}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {article.views_count} kali dibaca</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-slate-100 dark:bg-slate-800">
            <img
              src={article.image}
              alt={article.title}
              className="w-full max-h-[500px] object-cover"
            />
          </div>

          {/* Article HTML Content */}
          <div
            className="article-content bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Comment Section */}
          <CommentSection articleId={article.id} initialComments={article.comments || []} />
        </div>

        {/* Sidebar (1 Col) */}
        <div className="space-y-8">
          <TrendingSidebar articles={allArticles} categories={categories} />
        </div>
      </div>
    </article>
  );
}
