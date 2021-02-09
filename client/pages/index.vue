<template>
  <section class="container">

    <nuxt-link class="blog-logo" to="/">
      DjangoとNuxt.jsで作ったblog
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
      <nuxt-link class="article-title" :to="`/detail/${article.slug}/`">{{article.title}}</nuxt-link>
      <div class="article-date">{{(article.created_at)}}</div>
      <img class="article-thumbnail" :src="article.thumbnail"/>
      <p class="article-lead">{{article.lead_text}}</p>
      <div class="article-more">
        <nuxt-link :to="`/detail/${article.slug}/`"><span class="right">▶︎ </span><span class="more">more</span></nuxt-link>
      </div>
      <ul class="article-tag">
        <li :style="{'background': tag.color}" v-for="tag of article.tag" :key="tag.id" @click="updateSelectedTag(tag.id); search()"> # {{tag.name}}</li>
      </ul>
    </article>

    <div class="page-link" v-if="totalPages >= 2">
      <nuxt-link class="previousPage" id="back" v-if="previousPageURL" :to="getPageURL(currentPage - 1)">＜</nuxt-link>
      <div class="page-number">
        <nuxt-link :class="{'currentPage': page === currentPage}" v-for="page of totalPages" :key="page" :to="getPageURL(page)">
          {{page}}
        </nuxt-link>
      </div>
      <nuxt-link class="nextPage" id="next" v-if="nextPageURL" :to="getPageURL(currentPage + 1)">＞</nuxt-link>
    </div>
    
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { UPDATE_TAGS, UPDATE_ARTICLES } from "../store/mutation-types"

export default {
  head() {
    return {
      title: "記事一覧 - DjangoとNuxt.jsで作ったblog",
      meta: [
        {
          name: 'description',
          content: 'DjangoとNuxt.jsでったblogです。'
        },
      ],
    }
  },
  watchQuery: [
    'tag',
    'page'
  ],
  data() {
    return {
      selectedTag: this.$route.query.tag || '',
      loaded: false,
    }
  },

  async asyncData(context) {
    let articleURL = context.app.$articlesURL

    if (context.query.page) {
      articleURL += `?page=${context.query.page}`
    }
    if (context.query.tag) {
      articleURL += `&tag=${context.query.tag}`
    }

    return fetch(articleURL)
      .then(response => {
        return response.json()
      })
      .then(data => {
        context.store.dispatch('articles/' + UPDATE_ARTICLES, {data})
      })
  },

  created() {
    this.getTag()
  },

  computed: {
    ...mapGetters(
      'tags',['tagList'],
    ),
    ...mapGetters(
      'articles', [
        'articleList',
        'currentPage',
        'totalPages',
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

    getTag() {
      fetch(this.$tagsURL)
        .then(response => {
          return response.json()
        })
        .then(data => {
          this[UPDATE_TAGS](data)
        })
    },

    getPageURL(page) {
      return this.$router.resolve({
        query: this.createURLquery(page)
      }).route.fullPath
    },

    updateSelectedTag(tag) {
      this.selectedTag = tag
    },

    search() {
      this.$router.push({
        path: '/',
        query: this.createURLquery(1)
      })
    },

    createURLquery(page) {
      const query = {}
      query['page'] = page
      if (this.selectedTag) {
        query['tag'] = this.selectedTag
      }
      return query
    }
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
  font-size: 28px;
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

</style>
