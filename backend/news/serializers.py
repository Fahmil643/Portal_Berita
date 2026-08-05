from rest_framework import serializers
from .models import Category, Tag, Article, Comment

class CategorySerializer(serializers.ModelSerializer):
    articles_count = serializers.IntegerField(source='articles.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'color', 'articles_count']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'article', 'name', 'email', 'content', 'created_at', 'is_approved']
        read_only_fields = ['is_approved', 'created_at']


class ArticleListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    category_color = serializers.CharField(source='category.color', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            'id', 'title', 'slug', 'excerpt', 'category', 'category_name', 
            'category_slug', 'category_color', 'image', 'author_name', 
            'is_featured', 'is_breaking', 'views_count', 'read_time', 
            'published_at'
        ]

    def get_image(self, obj):
        return obj.get_image()


class ArticleDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'category', 'tags',
            'image', 'author_name', 'is_featured', 'is_breaking', 'views_count', 
            'read_time', 'comments', 'published_at', 'updated_at'
        ]

    def get_image(self, obj):
        return obj.get_image()

    def get_comments(self, obj):
        approved_comments = obj.comments.filter(is_approved=True)
        return CommentSerializer(approved_comments, many=True).data
