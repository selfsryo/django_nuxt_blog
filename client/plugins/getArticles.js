// import Vue from 'vue'
// import { UPDATE_ARTICLES } from "../store/mutation-types"


// Vue.prototype.$getArticles = () => {
//   const url = 'http://127.0.0.1:8000/api/articles/'

//   if (process.client) {
//     if (location.search) {
//       url += location.search
//     }
//   }

//   return fetch(url)
//     .then(response => {
//       if (response.ok){
//         return response.json();
//       } else {
//         throw Error();
//       }
//     })
//     .then(data => {
//       UPDATE_ARTICLES(data)
//     })
//     .catch(error => {
//       console.log(error);
//     })
// }

import { UPDATE_ARTICLES } from "../store/mutation-types"


const getArticles = store => {
  const url = 'http://127.0.0.1:8000/api/articles/'

  return fetch(url)
    .then(response => {
      if (response.ok){
        return response.json();
      } else {
        throw Error();
      }
    })
    .then(data => {
      console.log(data)
      store.dispatch('articles/' + UPDATE_ARTICLES, {data})
    })
    .catch(error => {
      console.log(error);
    })
}

export default ({}, inject) => {
  inject('getArticles', getArticles)
}
