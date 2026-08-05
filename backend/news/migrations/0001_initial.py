import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True, verbose_name='Nama Kategori')),
                ('slug', models.SlugField(blank=True, max_length=100, unique=True)),
                ('description', models.TextField(blank=True, verbose_name='Deskripsi')),
                ('color', models.CharField(default='#3b82f6', max_length=20, verbose_name='Warna Label')),
            ],
            options={
                'verbose_name': 'Kategori Berita',
                'verbose_name_plural': 'Kategori Berita',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('slug', models.SlugField(blank=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Judul Berita')),
                ('slug', models.SlugField(blank=True, max_length=255, unique=True)),
                ('excerpt', models.TextField(verbose_name='Ringkasan Singkat')),
                ('content', models.TextField(verbose_name='Isi Berita (HTML/Markdown)')),
                ('image_url', models.URLField(blank=True, max_length=500, verbose_name='URL Gambar (External)')),
                ('featured_image', models.ImageField(blank=True, null=True, upload_to='articles/', verbose_name='Upload Gambar Artikel')),
                ('author_name', models.CharField(default='Redaksi PortalBerita', max_length=100, verbose_name='Nama Penulis')),
                ('is_featured', models.BooleanField(default=False, verbose_name='Berita Utama (Hero)')),
                ('is_breaking', models.BooleanField(default=False, verbose_name='Breaking News (Running Text)')),
                ('views_count', models.PositiveIntegerField(default=0, verbose_name='Jumlah Pembaca')),
                ('read_time', models.CharField(default='3 min read', max_length=20, verbose_name='Waktu Baca')),
                ('published_at', models.DateTimeField(auto_now_add=True, verbose_name='Tanggal Rilis')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='articles', to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articles', to='news.category', verbose_name='Kategori')),
                ('tags', models.ManyToManyField(blank=True, related_name='articles', to='news.tag')),
            ],
            options={
                'verbose_name': 'Artikel Berita',
                'verbose_name_plural': 'Artikel Berita',
                'ordering': ['-published_at'],
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Nama Pengirim')),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('content', models.TextField(verbose_name='Isi Komentar')),
                ('is_approved', models.BooleanField(default=True, verbose_name='Disetujui')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='news.article')),
            ],
            options={
                'verbose_name': 'Komentar Artikel',
                'verbose_name_plural': 'Komentar Artikel',
                'ordering': ['-created_at'],
            },
        ),
    ]
