<template>

  <article class="container" v-if="article">

    <div class="article-header">
      <img class="article-thumbnail" :src="article.thumbnail"/>
      <div class="article-thumbnail-text" :style="{'color': article.color}" >
        <div class="article-created">{{(article.created_at)}}</div>
        <h2 class="article-title">{{article.title}}</h2>
        <ul class="article-tag">
          <li v-for="tag of article.tag" :key="tag.id" @click="updateSelectedTag(tag.id); search()"># {{tag.name}}</li>
        </ul>
      </div>
    </div>

    <div class="article-lead">{{article.lead_text}}</div>
    <div class="article-text" v-html="article.main_text"></div>

  </article>
  
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/night-owl.css';

export default {
  head() {
    return {
      title: `${this.article.title} - DjangoとNuxt.jsで作ったblog`,
      meta: [
        {
          name: 'description',
          content: `${this.article.lead_text}`,
        },
      ],
    }
  },

  async asyncData({ $articlesURL, params }) {
    const articleURL = $articlesURL + params.slug
    const article = await fetch(articleURL).then(res => res.json())
    return { article }
  },

  data() {
    return {
      selectedTag: this.$route.query.tag || '',
      loaded: false
    }
  },

  mounted() {
    this.setTocs()
    this.applyHighlighting()
  },

  methods: {
    applyHighlighting() {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightBlock(block)
      })
    },

    updateSelectedTag(tag) {
      this.selectedTag = tag
    },

    search() {
      this.$router.push({
        path: '/',
        query: { page: 1, tag: this.selectedTag }
      })
    },

    setTocs() {
      // 本文にtocがあれば目次作成
      if (document.querySelector('.toc') != null) {
        const toc = document.querySelector('.toc')
        toc.id = 'toc'

        // 目次のタイトルに'目次'の文字を追加
        if (!document.getElementById('tocTitle')) {
          const tocTitle = document.createElement('p')
          tocTitle.id = 'tocTitle'
          tocTitle.textContent = '目次'
          toc.insertBefore(tocTitle, toc.firstChild)
        }
      }
    }
  },
}
</script>

<style scoped>
.container {
  margin: 100px auto 0;
  width: 1000px;
}
ul {
  list-style: none;
}
.article-header {
  margin: 50px auto;
  position: relative;
  text-align: center;
}
.article-thumbnail {
  width: 100%;
}
.article-thumbnail-text {
  margin: 0;
  padding: 0;
  width: 80%;
  text-align: center;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
.article-created {
  font-size: 18px;
  font-weight: bold;
}
.article-title {
  font-size: 24px;
  margin: 20px auto;
}
.article-tag {
  margin-top: 20px;
  text-align: center;
}
.article-tag li {
  margin: auto 10px;
  font-size: 16px;
  display: inline;
  cursor: pointer;
}
.article-lead {
  margin: auto;
  padding: 60px 0;
  width: 80%;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.5px;
}
.article-text {
  margin: 0 auto;
  width: 80%;
}
.article-text >>> h1, .article-text >>> h2, .article-text >>> h3, .article-text >>> h4, .article-text >>> h5 {
  text-align: center;
  margin: 40px auto 20px;
}
.article-text >>> h1 {
  color: #123456;
  font-size: 18px;
  margin-top: 100px;
}
.article-text >>> h2 {
  font-size: 17px;
  margin-top: 80px;
}
.article-text >>> h3 {
  font-size: 16px;
}
.article-text >>> h4 {
  font-size: 15px;
}
.article-text >>> h5 {
  font-size: 14px;
}
.article-text >>> p {
  font-size: 14px;
  letter-spacing: 0.5px;
  line-height: 26px;
  margin-bottom: 16px;
}
.article-text >>> blockquote {
  border-left: 5px solid #ddd;
  color: #777;
  padding: 1em;
  padding-right: 0;
  margin: 1.5em 0;
}
.article-text >>> blockquote p {
  margin-bottom: 0;
}
.article-text >>> ul{
  font-size: 14px;
}
.article-text >>> table {
  font-size: 14px;
  border-collapse: collapse;
  margin: 30px auto;
  text-align: center;
}
.article-text >>> th {
  background: #011627;
  color: #d6deeb;
  font-weight: normal;
}
.article-text >>> th,
.article-text >>> td {
  padding: 5px;
  border: solid 1px;
}
.article-text >>> a {
  color: #000;
}
.article-text >>> a:hover {
  color: #ff0000;
}
.article-text >>> img {
  width: 100%;
}
.article-text >>> pre {
  margin: 10px auto 30px;
  font-size: 14px;
}
.article-text >>> .toc {
  background: #f2f2f2;
  margin: 0 auto 100px;
  padding: 40px 80px;
}  
.article-text >>> .toc a {
  color: #123456;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
}
.article-text >>> .toc ul ul a {
  color: #000;
  font-size: 14px;
  font-weight: normal;
}
.article-text >>> .toc p {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
.article-text >>> .toc li {
  margin-top: 30px;
}
.article-text >>> .toc ul ul li {
  list-style: none;
  margin-top: 5px;
}
</style>
