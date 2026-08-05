import Link from 'next/link';
import { Clock, Eye, User } from 'lucide-react';

export default function HeroSection({ articles = [] }) {
  if (!articles || articles.length === 0) return null;

  const mainStory = articles[0];
  const sideStories = articles.slice(1, 3);

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Large Hero Article (2 Cols) */}
        <div className="lg:col-span-2 relative group rounded-2xl overflow-hidden shadow-xl bg-slate-900 min-h-[420px] lg:min-h-[500px] flex flex-col justify-end">
          <img
            src={mainStory.image}
            alt={mainStory.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          <div className="relative p-6 md:p-8 z-10 space-y-3">
            {/* Category Tag */}
            <span
              className="inline-block px-3 py-1 text-xs font-bold text-white rounded-full tracking-wide uppercase shadow"
              style={{ backgroundColor: mainStory.category_color || '#2563eb' }}
            >
              {mainStory.category_name || 'Utama'}
            </span>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight font-serif group-hover:text-blue-200 transition-colors">
              <Link href={`/article/${mainStory.slug}`}>
                {mainStory.title}
              </Link>
            </h1>

            {/* Excerpt */}
            <p className="text-slate-300 text-sm md:text-base line-clamp-2 max-w-2xl">
              {mainStory.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-2 border-t border-slate-700/50">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-blue-400" />
                {mainStory.author_name || 'Redaksi'}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {mainStory.read_time || '4 min read'}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {mainStory.views_count || 0} pembaca
              </span>
            </div>
          </div>
        </div>

        {/* Side Stacked Stories (1 Col) */}
        <div className="flex flex-col gap-6">
          {sideStories.map((story) => (
            <div
              key={story.id}
              className="relative group rounded-2xl overflow-hidden shadow-lg bg-slate-900 h-[240px] flex flex-col justify-end"
            >
              <img
                src={story.image}
                alt={story.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

              <div className="relative p-5 z-10 space-y-2">
                <span
                  className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-white rounded-full uppercase"
                  style={{ backgroundColor: story.category_color || '#3b82f6' }}
                >
                  {story.category_name}
                </span>
                <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-blue-200 transition-colors">
                  <Link href={`/article/${story.slug}`}>
                    {story.title}
                  </Link>
                </h3>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span>{story.author_name}</span>
                  <span>•</span>
                  <span>{story.read_time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
