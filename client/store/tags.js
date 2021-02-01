import { UPDATE_TAGS } from "./mutation-types"


export const state = () => ({
  tags: {},
})

export const getters = {
  tagList: state => {
    return state.tags
  },
}

export const mutations = {
  [UPDATE_TAGS](state, payload) {
    state.tags = payload.data.result
  }
}

export const actions = {
  [UPDATE_TAGS]({ commit }, payload) {
    console.log(payload.data)
    commit(UPDATE_TAGS, payload)
  }
}
