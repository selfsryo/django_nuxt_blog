from rest_framework import viewsets

from blog.models import Tag, Article
from blog.paginations import CustomPagination
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
    pagination_class = CustomPagination
    lookup_field = 'slug'

    def get_queryset(self):
        """GETのパラメータに対応したクエリセットを返す"""
        queryset = super().get_queryset()

        tag = self.request.query_params.get('tag', None)
        if tag:
            queryset = queryset.filter(tag=tag)

        return queryset
