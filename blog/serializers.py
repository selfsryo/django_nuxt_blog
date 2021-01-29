from rest_framework import serializers

from blog.models import Article, Tag


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = '__all__'


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    tag = TagSerializer(read_only=True, many=True)
    main_text = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }

    def get_main_text(self, obj):
        return obj.convert_markdown_to_html()
