const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Fallback data when Django Backend is offline
const MOCK_CATEGORIES = [
  { id: 1, name: 'Nasional', slug: 'nasional', color: '#ef4444', description: 'Berita politik dan pemerintahan Indonesia' },
  { id: 2, name: 'Teknologi', slug: 'teknologi', color: '#3b82f6', description: 'AI, gadget, dan inovasi sains' },
  { id: 3, name: 'Ekonomi', slug: 'ekonomi', color: '#10b981', description: 'Pasar modal, bisnis, dan investasi' },
  { id: 4, name: 'Olahraga', slug: 'olahraga', color: '#f59e0b', description: 'Sepak bola, kejuaraan, dan atlet' },
  { id: 5, name: 'Hiburan', slug: 'hiburan', color: '#8b5cf6', description: 'Film, musik, dan gaya hidup' },
];

const MOCK_ARTICLES = [
  {
    id: 1,
    title: 'Revolusi AI 2026: Peluncuran Model Kecerdasan Buatan Generasi Terbaru Mengubah Lanskap Industri',
    slug: 'revolusi-ai-2026-peluncuran-model-kecerdasan-buatan-generasi-terbaru-mengubah-lanskap-industri',
    excerpt: 'Inovasi kecerdasan buatan mengalami lompatan besar dengan kemampuan bernalar kompleks yang efisien dan ramah lingkungan.',
    content: `<p><strong>JAKARTA</strong> &mdash; Perkembangan teknologi artificial intelligence (AI) semakin melesat pesat pada pertengahan tahun 2026 ini. Berbagai perusahaan teknologi terkemuka dunia secara bersamaan merilis arsitektur model AI terbaru yang menawarkan efisiensi energi hingga 70% lebih baik dibanding generasi sebelumnya.</p>
    <p>Model terbaru ini tidak hanya mampu memproses data teks dan visual secara mulus, namun juga mengintegrasikan penalaran logis tingkat tinggi yang meminimalkan risiko 'halusinasi'. Para pakar memperkirakan teknologi ini akan mempercepat otomatisasi di sektor medis, pendidikan, serta riset ilmiah.</p>
    <p>"Ini bukan sekadar peningkatan kecepatan, melainkan perubahan paradigma bagaimana manusia berkolaborasi dengan sistem cerdas," ungkap konsultan teknologi nasional dalam seminar AI Summit Jakarta.</p>`,
    category_name: 'Teknologi',
    category_slug: 'teknologi',
    category_color: '#3b82f6',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    author_name: 'Budi Santoso',
    is_featured: true,
    is_breaking: true,
    views_count: 1420,
    read_time: '4 min read',
    published_at: '2026-08-04T10:00:00Z',
    comments: [
      { id: 1, name: 'Andi Saputra', content: 'Teknologi AI berkembang sangat luar biasa pesat!', created_at: '2026-08-04T11:20:00Z' }
    ]
  },
  {
    id: 2,
    title: 'Pertumbuhan Ekonomi Digital Indonesia Tembus Rekor Baru di Kuartal III 2026',
    slug: 'pertumbuhan-ekonomi-digital-indonesia-tembus-rekor-baru-di-kuartal-iii-2026',
    excerpt: 'Sektor e-commerce dan fintech menjadi pendorong utama pertumbuhan ekonomi nasional di tengah dinamika pasar global.',
    content: `<p><strong>JAKARTA</strong> &mdash; Kementerian Keuangan mengumumkan bahwa nilai transaksi ekonomi digital Indonesia berhasil melampaui target tahunan. Peningkatan adopsi pembayaran digital dan perluasan akses internet di pelosok menjadi kunci sukses pertumbuhan ini.</p>
    <p>Usaha Mikro, Kecil, dan Menengah (UMKM) yang terdigitalisasi naik signifikan sebesar 35% year-on-year. Pemerintah optimistis tren positif ini akan terus berlanjut seiring penguatan infrastruktur 5G di seluruh kepulauan Indonesia.</p>`,
    category_name: 'Ekonomi',
    category_slug: 'ekonomi',
    category_color: '#10b981',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    author_name: 'Siti Rahmawati',
    is_featured: true,
    is_breaking: false,
    views_count: 980,
    read_time: '3 min read',
    published_at: '2026-08-04T08:30:00Z',
    comments: []
  },
  {
    id: 3,
    title: 'Timnas Sepak Bola Lolos ke Fase Gugur Kejuaraan Asia dengan Performa Memukau',
    slug: 'timnas-sepak-bola-lolos-ke-fase-gugur-kejuaraan-asia-dengan-performa-memukau',
    excerpt: 'Kemenangan dramatis 2-1 di menit akhir memastikan langkah Indonesia melaju ke babak 16 besar.',
    content: `<p><strong>STADION UTAMA</strong> &mdash; Perjuangan pantang menyerah ditunjukkan oleh skuad Garuda. Bertanding di hadapan puluhan ribu suporter, Timnas berhasil membalikkan keadaan setelah tertinggal di babak pertama.</p>
    <p>Gol penentu kemenangan dicetak melalui tendangan bebas akurat pada menit ke-89, memicu gemuruh sorak-sorai di seluruh penjuru tanah air.</p>`,
    category_name: 'Olahraga',
    category_slug: 'olahraga',
    category_color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop',
    author_name: 'Rizky Pratama',
    is_featured: false,
    is_breaking: true,
    views_count: 2300,
    read_time: '5 min read',
    published_at: '2026-08-04T07:15:00Z',
    comments: []
  },
  {
    id: 4,
    title: 'Pemerintah Resmikan Infrastruktur Hijau Berbasis Energi Terbarukan di IKN',
    slug: 'pemerintah-resmikan-infrastruktur-hijau-berbasis-energi-terbarukan-di-ikn',
    excerpt: 'Pembangkit listrik tenaga surya dan angin siap menyuplai 100% kebutuhan energi di kawasan inti pemerintahan.',
    content: `<p><strong>NUSANTARA</strong> &mdash; Presiden meresmikan pusat pengolahan energi terbarukan di Ibu Kota Nusantara (IKN). Langkah ini menjadikan IKN sebagai salah satu ibu kota paling ramah lingkungan di Asia Tenggara.</p>
    <p>Penggunaan transportasi umum berbasis listrik dan kendaraan otonom juga mulai diterapkan secara penuh minggu ini.</p>`,
    category_name: 'Nasional',
    category_slug: 'nasional',
    category_color: '#ef4444',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
    author_name: 'Ahmad Fauzi',
    is_featured: false,
    is_breaking: false,
    views_count: 1150,
    read_time: '4 min read',
    published_at: '2026-08-03T16:45:00Z',
    comments: []
  },
  {
    id: 5,
    title: 'Festival Film Internasional Jakarta 2026 Hadirkan Karya Sinema Terbaik Dunia',
    slug: 'festival-film-internasional-jakarta-2026-hadirkan-karya-sinema-terbaik-dunia',
    excerpt: 'Ratusan sineas lokal dan internasional berkumpul merayakan sinematografi bergengsi selama sepekan.',
    content: `<p><strong>JAKARTA</strong> &mdash; Industri perfilman tanah air kembali menggeliat dengan dibukanya Festival Film Internasional. Berbagai film layar lebar berkualitas tinggi yang meraih penghargaan di Cannes dan Sundance turut diputar di festival ini.</p>`,
    category_name: 'Hiburan',
    category_slug: 'hiburan',
    category_color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
    author_name: 'Maya Lestari',
    is_featured: false,
    is_breaking: false,
    views_count: 740,
    read_time: '3 min read',
    published_at: '2026-08-03T14:20:00Z',
    comments: []
  }
];

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return data.results || data;
  } catch (error) {
    return MOCK_CATEGORIES;
  }
}

export async function fetchArticles(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/articles/?${query}`, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return data.results || data;
  } catch (error) {
    let result = [...MOCK_ARTICLES];
    if (params.category) {
      result = result.filter(a => a.category_slug === params.category);
    }
    if (params.breaking) {
      result = result.filter(a => a.is_breaking === true);
    }
    if (params.featured) {
      result = result.filter(a => a.is_featured === true);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q));
    }
    return result;
  }
}

export async function fetchArticleBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (error) {
    const found = MOCK_ARTICLES.find(a => a.slug === slug);
    return found || MOCK_ARTICLES[0];
  }
}

export async function postComment(articleId, name, email, content) {
  try {
    const res = await fetch(`${API_BASE_URL}/comments/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ article: articleId, name, email, content })
    });
    if (!res.ok) throw new Error('Failed to post comment');
    return await res.json();
  } catch (error) {
    return { id: Date.now(), name, content, created_at: new Date().toISOString() };
  }
}
