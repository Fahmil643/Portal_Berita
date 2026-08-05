import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function BreakingNews({ articles = [] }) {
  const breakingList = articles.length > 0 ? articles : [
    { id: 1, title: 'Revolusi AI 2026: Peluncuran Model Kecerdasan Buatan Generasi Terbaru Mengubah Lanskap Industri', slug: 'revolusi-ai-2026-peluncuran-model-kecerdasan-buatan-generasi-terbaru-mengubah-lanskap-industri' },
    { id: 3, title: 'Timnas Sepak Bola Lolos ke Fase Gugur Kejuaraan Asia dengan Performa Memukau', slug: 'timnas-sepak-bola-lolos-ke-fase-gugur-kejuaraan-asia-dengan-performa-memukau' },
  ];

  return (
    <div className="bg-red-600 dark:bg-red-700 text-white py-2 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-hidden">
        {/* Label */}
        <div className="flex items-center gap-1.5 bg-red-800 text-white font-bold text-xs uppercase px-3 py-1 rounded shadow-sm shrink-0">
          <Zap className="w-3.5 h-3.5 fill-current animate-bounce" />
          <span>Breaking News</span>
        </div>

        {/* Ticker Text */}
        <div className="overflow-hidden relative w-full flex-1">
          <div className="animate-ticker flex items-center space-x-8 text-sm font-medium">
            {breakingList.concat(breakingList).map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                href={`/article/${item.slug}`}
                className="hover:underline flex items-center gap-2 shrink-0 transition-opacity hover:opacity-90"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-200" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
