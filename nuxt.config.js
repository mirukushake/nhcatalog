const envPath = `.env.${process.env.ENV || 'local'}`;
require('dotenv').config();

export default {
  mode: 'universal',
  server: {
    port: process.env.PORT || 5000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  srcDir: 'client/',
  env: {
    IMG_URL: process.env.IMG_URL,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuexpersist.js', ssr: false },
    '~plugins/day.js',
    '~plugins/axios.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    ['@nuxtjs/dotenv', { path: process.cwd(), filename: envPath }],
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            file: 'en.json',
            id: 1,
          },
          {
            code: 'ja',
            file: 'ja.json',
            id: 2,
          },
        ],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
        },
        strategy: 'no_prefix',
        detectBrowserLanguage: {
          // If enabled, a cookie is set once a user has been redirected to his
          // preferred language to prevent subsequent redirections
          // Set to false to redirect every time
          useCookie: true,
          // Cookie name
          cookieKey: 'i18n_nhc',
          // Set to always redirect to value stored in the cookie, not just once
          alwaysRedirect: false,
          // If no locale for the browsers locale is a match, use this one as a fallback
          fallbackLocale: null,
        },
        lazy: true,
        vueI18nloader: true,
        langDir: 'lang/',

      },
    ],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/auth',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  // proxy: {
  //   '/api/': { target: process.env.API_URL, pathRewrite: { '^/api/': '' } },
  // },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          user: { url: '/user', method: 'get', propertyName: 'user' },
          logout: false,
        },
      },
      redirect: {
        login: '/login',
        logout: '/',
        home: '/profile',
      },
    },
  },

  vuetify: {
    customVariables: ['~/assets/styles/variables.scss'],
    treeShake: true,
    theme: {
      themes: {
        light: {
          primary: '#56B9C1',
          secondary: '#71d19c',
          accent: '#9ad4e4',
          error: '#f44336',
          info: '#71d19b',
          success: '#4eb272',
          warning: '#cca23a',

        },
      },
    },
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        });
      }
    },
  },
};
