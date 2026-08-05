import Link from 'next/link';
import { Flame, Eye, ArrowUpRight } from 'lucide-react';

export default function TrendingSidebar({ articles = [], categories = [] }) {
  // Sort by views count
  const sortedTrending = [...articles].sort((a, b) => (b.views_count || 0) - (a.views_count || 0)).slice(0, 5);

  return (
    <aside className="space-y-8">
      {/* Trending Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Paling Populer
          </h3>
        </div>

        <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
          {sortedTrending.map((item, idx) => (
            <div key={item.id} className="pt-3 first:pt-0 flex items-start gap-3 group">
              <span className="text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-blue-600 transition-colors w-6">
                0{idx + 1}
              </span>
              <div className="space-y-1 flex-1">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                >
                  {item.category_name}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  <Link href={`/article/${item.slug}`}>
                    {item.title}
                  </Link>
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-1">
                  <Eye className="w-3 h-3 text-slate-400" />
                  <span>{item.views_count} pembaca</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category List Widget */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          Eksplorasi Kategori
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-semibold transition-all border border-slate-200/60 dark:border-slate-700/60"
            >
              <span>{cat.name}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
