// import Vue from 'vue'
import { UPDATE_TAGS } from "../store/mutation-types"


const getTags = store => {
  const url = 'http://127.0.0.1:8000/api/tags/'

  return fetch(url)
    .then(response => {
      if (response.ok){
        return response.json();
      } else {
        throw Error();
      }
    })
    .then(data => {
      store.dispatch('tags/' + UPDATE_TAGS, {data})
    })
    .catch(error => {
      console.log(error);
    })
}

export default ({}, inject) => {
  inject('getTags', getTags)
}


// Vue.prototype.$getTags = () => {
//   const url = 'http://127.0.0.1:8000/api/tags/'

//   return fetch(url)
//     .then(response => {
//       if (response.ok){
//         return response.json();
//       } else {
//         throw Error();
//       }
//     })
//     .then(data => {
//       UPDATE_TAGS(data)
//     })
//     .catch(error => {
//       console.log(error);
//     })
// }
