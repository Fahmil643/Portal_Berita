import Link from 'next/link';
import { Clock, Eye, ChevronRight } from 'lucide-react';

export default function ArticleCard({ article, horizontal = false }) {
  if (!article) return null;

  if (horizontal) {
    return (
      <div className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
        <div className="sm:w-48 h-36 rounded-lg overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-800">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between space-y-2">
          <div className="space-y-1.5">
            <span
              className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-white rounded uppercase tracking-wider"
              style={{ backgroundColor: article.category_color || '#3b82f6' }}
            >
              {article.category_name}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              <Link href={`/article/${article.slug}`}>
                {article.title}
              </Link>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2">
              {article.excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="font-medium">{article.author_name}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.read_time}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.views_count}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all overflow-hidden">
      <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span
          className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold text-white rounded-full uppercase shadow"
          style={{ backgroundColor: article.category_color || '#3b82f6' }}
        >
          {article.category_name}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            <Link href={`/article/${article.slug}`}>
              {article.title}
            </Link>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="font-medium">{article.author_name}</span>
          <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
            Baca <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
