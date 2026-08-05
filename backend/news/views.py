from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F, Q
from .models import Category, Tag, Article, Comment
from .serializers import (
    CategorySerializer, TagSerializer, ArticleListSerializer, 
    ArticleDetailSerializer, CommentSerializer
)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().select_related('category').prefetch_related('tags')
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ArticleDetailSerializer
        return ArticleListSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by Category Slug
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)

        # Filter by Breaking News
        is_breaking = self.request.query_params.get('breaking', None)
        if is_breaking is not None:
            queryset = queryset.filter(is_breaking=is_breaking.lower() == 'true')

        # Filter by Featured
        is_featured = self.request.query_params.get('featured', None)
        if is_featured is not None:
            queryset = queryset.filter(is_featured=is_featured.lower() == 'true')

        # Search Query
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) | 
                Q(excerpt__icontains=search_query) | 
                Q(content__icontains=search_query)
            )

        return queryset

    @action(detail=True, methods=['post'])
    def increment_views(self, request, slug=None):
        article = self.get_object()
        article.views_count = F('views_count') + 1
        article.save(update_fields=['views_count'])
        article.refresh_from_db()
        return Response({'views_count': article.views_count}, status=status.HTTP_200_OK)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(is_approved=True)
    serializer_class = CommentSerializer
