from django.core.management.base import BaseCommand
from news.models import Category, Tag, Article, Comment

class Command(BaseCommand):
    help = 'Mengisi database Django dengan sampel berita portal modern'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Memulai seeder data berita...'))

        # Categories
        categories_data = [
            {'name': 'Nasional', 'color': '#ef4444', 'description': 'Berita politik, pemerintahan, dan peristiwa terkini di Indonesia'},
            {'name': 'Teknologi', 'color': '#3b82f6', 'description': 'Inovasi AI, gadget, startup, dan perkembangan teknologi global'},
            {'name': 'Ekonomi', 'color': '#10b981', 'description': 'Bisnis, pasar modal, investasi, perbankan, dan keuangan'},
            {'name': 'Olahraga', 'color': '#f59e0b', 'description': 'Sepak bola, bulu tangkis, F1, Moto GP, dan kejuaraan dunia'},
            {'name': 'Hiburan', 'color': '#8b5cf6', 'description': 'Film, musik, gaya hidup, selebriti, dan pop culture'},
        ]

        cat_objs = {}
        for cat in categories_data:
            obj, created = Category.objects.get_or_create(
                name=cat['name'],
                defaults={'color': cat['color'], 'description': cat['description']}
            )
            cat_objs[cat['name']] = obj

        # Tags
        tags_data = ['AI', 'Indonesia', 'EkonomiDigital', 'IbuKotaNusantara', 'TimnasDay', 'Gadget2026', 'EV']
        tag_objs = []
        for tag in tags_data:
            obj, created = Tag.objects.get_or_create(name=tag)
            tag_objs.append(obj)

        # Articles
        articles_data = [
            {
                'title': 'Revolusi AI 2026: Peluncuran Model Kecerdasan Buatan Generasi Terbaru Mengubah Lanskap Industri',
                'excerpt': 'Inovasi kecerdasan buatan mengalami lompatan besar dengan kemampuan bernalar kompleks yang efisien dan ramah lingkungan.',
                'content': '''<p><strong>JAKARTA</strong> &mdash; Perkembangan teknologi artificial intelligence (AI) semakin melesat pesat pada pertengahan tahun 2026 ini. Berbagai perusahaan teknologi terkemuka dunia secara bersamaan merilis arsitektur model AI terbaru yang menawarkan efisiensi energi hingga 70% lebih baik dibanding generasi sebelumnya.</p>
                <p>Model terbaru ini tidak hanya mampu memproses data teks dan visual secara mulus, namun juga mengintegrasikan penalaran logis tingkat tinggi yang meminimalkan risiko 'halusinasi'. Para pakar memperkirakan teknologi ini akan mempercepat otomatisasi di sektor medis, pendidikan, serta riset ilmiah.</p>
                <p>"Ini bukan sekadar peningkatan kecepatan, melainkan perubahan paradigma bagaimana manusia berkolaborasi dengan sistem cerdas," ungkap konsultan teknologi nasional dalam seminar AI Summit Jakarta.</p>''',
                'category': cat_objs['Teknologi'],
                'image_url': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
                'author_name': 'Budi Santoso',
                'is_featured': True,
                'is_breaking': True,
                'views_count': 1420,
                'read_time': '4 min read'
            },
            {
                'title': 'Pertumbuhan Ekonomi Digital Indonesia Tembus Rekor Baru di Kuartal III 2026',
                'excerpt': 'Sektor e-commerce dan fintech menjadi pendorong utama pertumbuhan ekonomi nasional di tengah dinamika pasar global.',
                'content': '''<p><strong>JAKARTA</strong> &mdash; Kementerian Keuangan mengumumkan bahwa nilai transaksi ekonomi digital Indonesia berhasil melampaui target tahunan. Peningkatan adopsi pembayaran digital dan perluasan akses internet di pelosok menjadi kunci sukses pertumbuhan ini.</p>
                <p>Usaha Mikro, Kecil, dan Menengah (UMKM) yang terdigitalisasi naik signifikan sebesar 35% year-on-year. Pemerintah optimistis tren positif ini akan terus berlanjut seiring penguatan infrastruktur 5G di seluruh kepulauan Indonesia.</p>''',
                'category': cat_objs['Ekonomi'],
                'image_url': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
                'author_name': 'Siti Rahmawati',
                'is_featured': True,
                'is_breaking': False,
                'views_count': 980,
                'read_time': '3 min read'
            },
            {
                'title': 'Timnas Sepak Bola Lolos ke Fase Gugur Kejuaraan Asia dengan Performa Memukau',
                'excerpt': 'Kemenangan dramatis 2-1 di menit akhir memastikan langkah Indonesia melaju ke babak 16 besar.',
                'content': '''<p><strong>STADION UTAMA</strong> &mdash; Perjuangan pantang menyerah ditunjukkan oleh skuad Garuda. Bertanding di hadapan puluhan ribu suporter, Timnas berhasil membalikkan keadaan setelah tertinggal di babak pertama.</p>
                <p>Gol penentu kemenangan dicetak melalui tendangan bebas akurat pada menit ke-89, memicu gemuruh sorak-sorai di seluruh penjuru tanah air.</p>''',
                'category': cat_objs['Olahraga'],
                'image_url': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop',
                'author_name': 'Rizky Pratama',
                'is_featured': False,
                'is_breaking': True,
                'views_count': 2300,
                'read_time': '5 min read'
            },
            {
                'title': 'Pemerintah Resmikan Infrastruktur Hijau Berbasis Energi Terbarukan di IKN',
                'excerpt': 'Pembangkit listrik tenaga surya dan angin siap menyuplai 100% kebutuhan energi di kawasan inti pemerintahan.',
                'content': '''<p><strong>NUSANTARA</strong> &mdash; Presiden meresmikan pusat pengolahan energi terbarukan di Ibu Kota Nusantara (IKN). Langkah ini menjadikan IKN sebagai salah satu ibu kota paling ramah lingkungan di Asia Tenggara.</p>
                <p>Penggunaan transportasi umum berbasis listrik dan kendaraan otonom juga mulai diterapkan secara penuh minggu ini.</p>''',
                'category': cat_objs['Nasional'],
                'image_url': 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
                'author_name': 'Ahmad Fauzi',
                'is_featured': False,
                'is_breaking': False,
                'views_count': 1150,
                'read_time': '4 min read'
            },
            {
                'title': 'Festifal Film Internasional Jakarta 2026 Hadirkan Karya Sinema Terbaik Dunia',
                'excerpt': 'Ratusan sineas lokal dan internasional berkumpul merayakan sinematografi bergengsi selama sepekan.',
                'content': '''<p><strong>JAKARTA</strong> &mdash; Industri perfilman tanah air kembali menggeliat dengan dibukanya Festival Film Internasional. Berbagai film layar lebar berkualitas tinggi yang meraih penghargaan di Cannes dan Sundance turut diputar di festival ini.</p>''',
                'category': cat_objs['Hiburan'],
                'image_url': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
                'author_name': 'Maya Lestari',
                'is_featured': False,
                'is_breaking': False,
                'views_count': 740,
                'read_time': '3 min read'
            }
        ]

        for item in articles_data:
            article, created = Article.objects.get_or_create(
                title=item['title'],
                defaults={
                    'excerpt': item['excerpt'],
                    'content': item['content'],
                    'category': item['category'],
                    'image_url': item['image_url'],
                    'author_name': item['author_name'],
                    'is_featured': item['is_featured'],
                    'is_breaking': item['is_breaking'],
                    'views_count': item['views_count'],
                    'read_time': item['read_time']
                }
            )
            if created:
                article.tags.set(tag_objs[:3])
                # Add sample comment
                Comment.objects.create(
                    article=article,
                    name='Pengunjung Setia',
                    email='reader@example.com',
                    content='Artikel yang sangat informatif dan mendalam. Terima kasih tim redaksi!'
                )

        self.stdout.write(self.style.SUCCESS('Berhasil memasukkan sampel berita ke database Django!'))
