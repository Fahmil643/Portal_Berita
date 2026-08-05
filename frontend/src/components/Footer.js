import Link from 'next/link';
import { Newspaper, Heart } from 'lucide-react';

export default function Footer({ categories = [] }) {
  const defaultCategories = [
    { name: 'Nasional', slug: 'nasional' },
    { name: 'Teknologi', slug: 'teknologi' },
    { name: 'Ekonomi', slug: 'ekonomi' },
    { name: 'Olahraga', slug: 'olahraga' },
    { name: 'Hiburan', slug: 'hiburan' },
  ];

  const catList = categories.length > 0 ? categories : defaultCategories;

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: About */}
        <div className="space-y-4 md:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <Newspaper className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              PORTAL<span className="text-blue-500">BERITA</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            PortalBerita adalah media informasi digital tepercaya yang menyajikan berita terkini, analisis tajam, dan informasi akurat seputar nasional, teknologi, ekonomi, olahraga, dan hiburan secara aktual 24/7.
          </p>
          <p className="text-xs text-slate-500">
            Backend API didukung oleh <strong>Django REST Framework</strong> & Frontend di-render menggunakan <strong>Next.js 14+</strong>.
          </p>
        </div>

        {/* Col 2: Categories */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Kategori Berita</h4>
          <ul className="space-y-2 text-sm">
            {catList.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className="hover:text-blue-400 transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Redaksi & Akses</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="http://localhost:8000/admin/" target="_blank" className="text-blue-400 hover:underline">
                CMS Redaksi (Django Admin)
              </Link>
            </li>
            <li><Link href="#" className="hover:text-white transition-colors">Tentang Kami</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Pedoman Media Siber</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Kontak & Iklan</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} PORTALBERITA. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> Next.js & Django
          </span>
        </div>
      </div>
    </footer>
  );
}
