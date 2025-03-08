export default {
  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',
  target: 'server',
  ssr: true,
  compatibilityDate: '2024-12-27',
  // ここで、ポートを設定しないと、Nuxt.jsのインデックスページにアクセスできない。
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  generate: {
    routes: [],
  },
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [

  ],
  // plugins: [],
  plugins: ['~/plugins/pinia.js'],
  components: false,
  buildModules: [
  ],
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore'],
  },
  nitro: {
    preset: 'node-server',
    output: {
      dir: '.output',
    },
  },
  app: {
    baseURL: '/',
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api', // DjangoのAPIベースURL
    },
  },
  // axios: {
  //   baseURL: 'http://localhost:8001/api',
  // },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access',
          type: 'Bearer',
          maxAge: 1800,
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 604800,
        },
        endpoints: {
          login: { url: '/token/', method: 'post'},
          logout: {url: '/token/logout/', method: 'post'},
          refresh: { url: '/token/refresh/', method: 'post' },
          signup: {url: '/signup/', method: 'post'},
          user: false
        },
      },
    },
  },
  build: {
  }
};
