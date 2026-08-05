import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchCategories } from '@/lib/api';

export const metadata = {
  title: 'PORTALBERITA - Berita Terkini, Aktual & Tepercaya',
  description: 'Portal berita terdepan menyajikan berita terkini nasional, teknologi, ekonomi, olahraga, dan hiburan secara real-time.',
};

export default async function RootLayout({ children }) {
  const categories = await fetchCategories();

  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar categories={categories} />
        <main className="flex-1">
          {children}
        </main>
        <Footer categories={categories} />
      </body>
    </html>
  );
}
