from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Nama Kategori")
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True, verbose_name="Deskripsi")
    color = models.CharField(max_length=20, default="#3b82f6", verbose_name="Warna Label")

    class Meta:
        verbose_name = "Kategori Berita"
        verbose_name_plural = "Kategori Berita"
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"#{self.name}"


class Article(models.Model):
    title = models.CharField(max_length=255, verbose_name="Judul Berita")
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    excerpt = models.TextField(verbose_name="Ringkasan Singkat")
    content = models.TextField(verbose_name="Isi Berita (HTML/Markdown)")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='articles', verbose_name="Kategori")
    tags = models.ManyToManyField(Tag, blank=True, related_name='articles')
    
    # Image options: custom upload or direct web URL
    image_url = models.URLField(max_length=500, blank=True, verbose_name="URL Gambar (External)")
    featured_image = models.ImageField(upload_to='articles/', blank=True, null=True, verbose_name="Upload Gambar Artikel")
    
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='articles')
    author_name = models.CharField(max_length=100, default="Redaksi PortalBerita", verbose_name="Nama Penulis")
    
    is_featured = models.BooleanField(default=False, verbose_name="Berita Utama (Hero)")
    is_breaking = models.BooleanField(default=False, verbose_name="Breaking News (Running Text)")
    
    views_count = models.PositiveIntegerField(default=0, verbose_name="Jumlah Pembaca")
    read_time = models.CharField(max_length=20, default="3 min read", verbose_name="Waktu Baca")
    
    published_at = models.DateTimeField(auto_now_add=True, verbose_name="Tanggal Rilis")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Artikel Berita"
        verbose_name_plural = "Artikel Berita"
        ordering = ['-published_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_image(self):
        if self.featured_image:
            return self.featured_image.url
        if self.image_url:
            return self.image_url
        return "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop"

    def __str__(self):
        return self.title


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    name = models.CharField(max_length=100, verbose_name="Nama Pengirim")
    email = models.EmailField(verbose_name="Email")
    content = models.TextField(verbose_name="Isi Komentar")
    is_approved = models.BooleanField(default=True, verbose_name="Disetujui")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Komentar Artikel"
        verbose_name_plural = "Komentar Artikel"
        ordering = ['-created_at']

    def __str__(self):
        return f"Komentar oleh {self.name} di {self.article.title}"
