export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DjangoとNuxt.jsで作ったblog',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/getArticles.js' },
    { src: '~/plugins/getTags.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-webfontloader',
  ],

  // Url: https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap
  webfontloader: {
    google: {
      families: ['Karla:400,700',] 
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
