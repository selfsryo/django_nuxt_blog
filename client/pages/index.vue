<template>
  <section class="container">

    <nuxt-link class="blog-logo" to="/">
      <!-- <img src="/title.svg"> -->
      title
    </nuxt-link>

    <ul class="tag-filter">
      <li class="category">CATEGORY</li>
      <li>
        <select v-model="selectedTag" @change="search()">
          <option value="" :key="-1">all</option>
          <option v-for="tag of tagList" :value="tag.id" :key="tag.id">{{tag.name}}</option>
        </select>
      </li>
    </ul>

    <div v-if="!loaded">
      <div class="spinner"></div>
      <div class="loadingMask"></div>
    </div>

    <article class="article" v-for="article of articleList" :key="article.slug">
      <!-- <nuxt-link class="article-title" :to="`/detail/${article.slug}/`">{{article.title}}</nuxt-link> -->
      <div class="article-date">{{(article.created_at)}}</div>
      <img class="article-thumbnail" :src="article.thumbnail"/>
      <p class="article-lead">{{article.lead_text}}</p>
      <div class="article-more">
        <!-- <nuxt-link :to="`/detail/${article.slug}/`"><span class="right">▶︎ </span><span class="more">more</span></nuxt-link> -->
      </div>
      <ul class="article-tag">
        <li :style="{'background': tag.color}" v-for="tag of article.tag" :key="tag.id" @click="updateSelectedTag(tag.id); search()"> # {{tag.name}}</li>
      </ul>
    </article>
    
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { UPDATE_TAGS, UPDATE_ARTICLES } from "../store/mutation-types"
export default {
  head() {
    return {
      title: "記事一覧 - Selfs Ryo Com",
      meta: [
        {
          name: 'description',
          content: '独学で学んだことを発信していくblogです。主にPythonやDjango、JavaScriptにまつわる記事を書いていきます。'
        },
        {
          property: 'og:description',
          content: '独学で学んだことを発信していくblogです。主にPythonやDjango、JavaScriptにまつわる記事を書いていきます。'
        },
      ],
    }
  },
  data() {
    return {
      selectedTag: this.$route.query.tag || '',
      loaded: false
    }
  },
  watch: {
    $route() {
      this.loaded = false
      this.$getArticles()
      this.selectedTag = this.$route.query.tag || ''
    },
  },
  async asyncData(context) {
    return context.app.$getTags(context.store)
  },
  created() {
    // this.$getArticles()
    // this.$getTags(context.store)
  },
    
  mounted() {
    console.log(this.tagList)
  },
  computed: {
    ...mapGetters(
      'tags',['tagList'],
    ),
    ...mapGetters(
      'articles', [
        'articleList',
        'previousPageURL',
        'nextPageURL'
      ]
    ),
  },
  methods: {
    ...mapActions(
      'articles',[
        UPDATE_ARTICLES
      ]),

    ...mapActions(
      'tags',[
        UPDATE_TAGS
      ]),

    getPageURL(page) {
      return this.$router.resolve({
        query: {page, tag: this.selectedTag }
      }).route.fullPath
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
  }
};
</script>

<style scoped>
.container {
  width: 800px;
  margin: auto;
}
ul {
  list-style: none;
}
.blog-logo {
  display: block;
  width: 400px;
  margin: 90px auto 80px;
  text-align: center;
  cursor: pointer;
}
.tag-filter {
  border-bottom: #ddd solid 1px;
  font-size: 14px;
  padding-bottom: 20px;
  text-align: right;
}
.tag-filter li{
  display: inline;
  margin-left: 10px;
}
.tag-filter select {
  background: #eee;
  border: none;
  border-radius: 3px;
  padding: 3px;
  text-align: center;
  outline: none;
}
article {
  border-bottom: #ddd solid 1px;
  padding: 70px 0;
}
.article-title {
  color: #000;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  text-decoration: none;
  cursor: pointer;
}
.article-title:hover {
  text-decoration: underline;
}
.article-date {
  color: #aaa;
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 30px;
}
.article-thumbnail {
  height: 246px;
  width: 368px;
  margin-bottom: 25px;
}
.article-lead {
  font-size: 14px;
  letter-spacing: 0.5px;
}
.article-more {
  text-align: right;
  margin: 10px auto;
}
.article-more a {
  color: #aaa;
  text-decoration: none;
}
.article-more span.right{
  font-size: 1px;
}
.article-more span.more{
  font-size: 14px;
  border-bottom: #aaa 1px solid;
  letter-spacing: 1px;
}
.article-tag {
  width: 100%;
}
.article-tag li {
  float: left;
  font-size: 14px;
  padding: 3px 10px 3px 5px;
  margin-right: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  display: block;
}
.page-link {
  display: flex;
  margin: 70px auto 0;
  font-size: 15px;
  position: relative;
}
.page-link a {
  color: #bbb;
  text-decoration: none;
}
.page-number {
  display: flex;
  margin: auto;
  width: 90px;
  justify-content: space-between;
}
.page-number .currentPage, .page-link .previousPage, .page-link .nextPage {
  color: #000;
}
.page-link .previousPage, .page-link .nextPage {
  font-size: 12px;
  position: absolute;
}
.page-number .currentPage {
  text-decoration: underline;
}
.page-link .previousPage {
  left: 30%;
}
.page-link .nextPage {
  right: 30%;
}
.loadingMask {
  background: #fff;
  display: block;
  height: 8000px;
  width: 100%;
  position: absolute;
  top: 350px;
  left: 0;
  z-index: 2;
}
@media (max-width: 1024px) {
  .container {
    width: 70%;
  }
}
@media (max-width: 768px) {
  .tag-filter select {
    font-size: 16px;
    transform: scale(0.8);
  }
}
@media (max-width: 480px) {
  .container {
    width: 85%;
  }
  .blog-logo {
    width: 90%;
    margin-bottom: 40px;
  }
  .tag-filter li{
    margin-left: 6px;
  }
  .tag-filter li.category{
    font-size: 11px;
  }
  article {
    padding: 40px 0 70px;
  }
  .article-title {
    font-size: 15px;
  }
  .article-date {
    font-size: 11px;
  }
  .article-thumbnail {
    width: 100%;
    height: initial;
  }
  .article-lead {
    font-size: 12px;
  } 
  .page-link .previousPage {
    left: 15%;
  }
  .page-link .nextPage {
    right: 15%;
  }
  .loadingMask {
    top: 300px;
  }
}
</style>
