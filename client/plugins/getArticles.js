const articlesURL = 'http://127.0.0.1:8000/api/articles/'

export default ({}, inject) => {
  inject('articlesURL', articlesURL)
}
