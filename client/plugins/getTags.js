const tagsURL = 'http://127.0.0.1:8000/api/tags/'

export default ({}, inject) => {
  inject('tagsURL', tagsURL)
}
