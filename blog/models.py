from django.db import models
from markdownx.models import MarkdownxField
from markdownx.utils import markdownify


class Tag(models.Model):
    name = models.CharField('タグ名', max_length=255)
    color = models.CharField('背景色', max_length=7, default='#000000')

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField('タイトル', max_length=255)
    thumbnail = models.ImageField(
        'サムネイル',
        null=True,
        blank=True,
        upload_to='image/'
    )
    tag = models.ManyToManyField(Tag, verbose_name='タグ')
    slug = models.SlugField('スラッグ', unique=True)
    lead_text = models.TextField('紹介文', max_length=255)
    main_text = MarkdownxField('本文')
    is_public = models.BooleanField('公開する', default=False)
    created_at = models.DateField('作成日')

    class Color(models.TextChoices):
        WHITE = "#ffffff", "白"
        BLACK = "#000000", "黒"

    color = models.CharField(
        '文字色',
        max_length=7,
        choices=Color.choices,
        default="#ffffff"
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def convert_markdown_to_html(self):
        return markdownify(self.main_text)
