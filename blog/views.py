from rest_framework import viewsets

from blog.models import Tag, Article
from blog.permissions import IsAdminOrReadOnly
from blog.serializers import ArticleSerializer, TagSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (IsAdminOrReadOnly,)


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.filter(is_public=True)
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminOrReadOnly,)
    lookup_field = 'slug'
