import { UPDATE_ARTICLES } from "./mutation-types"

export const state = () => ({
  articles: {},
})

export const getters = {
  articleList: state => {
    return state.articles.results
  },
  currentPage(state) {
    return state.articles.current
  },
  totalPages(state) {
    return state.articles.total
  },
  previousPageURL(state) {
    return state.articles.previous
  },
  nextPageURL(state) {
    return state.articles.next
  },
}

export const mutations = {
  [UPDATE_ARTICLES](state, payload) {
    state.articles = payload
  }
}

export const actions = {
  [UPDATE_ARTICLES]({ commit }, payload) {
    commit(UPDATE_ARTICLES, payload)
  }
}
