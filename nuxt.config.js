import colors from 'vuetify/es5/util/colors';

const is_production = process.env.NODE_ENV === 'production';

export default {
  mode: 'universal',
  target: 'static',
  server: {
    port: 3000, // default: 3000
    host: 'localhost' // default: localhost
  },
  /*
   ** Headers of the page
   * TODO
   */
  head: {
    title: 'ノエルボタン',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        /**
        * TODO
        */
        content: '夜空メル　ボイスボタン; 夜空梅露的语音按钮'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        /**
        * TODO
        */
        content: 'メルボタン,MEL BUTTON,梅露按钮,hololive,Yozora Mel,夜空メル,夜空梅露,语音按钮,ボイスボタン'
      },
      /**
        * TODO
        */
      { hid: 'og:site_name', property: 'og:site_name', content: 'メルボタン' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://yozoramel.org' },
      { hid: 'og:title', property: 'og:title', content: 'メルボタン' },
      {
        hid: 'og:description',
        property: 'og:description',
        /**
        * TODO
        */
        content: '夜空メルのボイスボタン。'
      },
      /**
        * TODO
        */
      { hid: 'og:image', property: 'og:image', content: 'https://yozoramel.org/img/tweet.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@samuimomijiyuki' }
    ],
    /**
        * TODO
        */
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/svg/1f31f.svg' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@plugins/i18n' },
    { src: '@plugins/eventBus.js', mode: 'client' },
    { src: '@plugins/analytics.js', mode: 'client' },
    { src: '@plugins/route.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [['@nuxtjs/vuetify', { treeShake: is_production }]],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/axios', '@nuxtjs/markdownit', '@nuxtjs/sitemap'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    /**
     * TODO
     * 颜色
     */
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.amber.base,
          secondary: colors.grey.darken4,
          accent: colors.blue.lighten2,
          error: colors.deepOrange.base,
          warning: colors.orange.base,
          info: colors.blueGrey.base,
          success: colors.teal.base
        },
        dark: {
          primary: colors.amber.lighten1,
          secondary: colors.grey.darken4,
          accent: colors.lightBlue.darken4,
          error: colors.deepOrange.accent4,
          warning: colors.amber.base,
          info: colors.teal.lighten1,
          success: colors.green.accent3
        }
      }
    },
    defaultAssets: {
      font: null,
      icons: 'mdiSvg'
    }
  },
  pwa: {
    /**
     * TODO
     * PWA
     */
    manifest: {
      start_url: '/?standalone=true',
      name: 'メルボタン'
    },
    workbox: {
      swURL: '/service-worker.js',
      skipWaiting: true,
      runtimeCaching: [
        {
          /**
        * TODO
        */
          urlPattern: 'https://cdn.jsdelivr.net/gh/voosc/mel-button@master/static/voices/*'
        }
      ]
    }
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: false,
    use: ['markdown-it-div', 'markdown-it-attrs'],
    injected: true
  },
  sitemap: {
    path: '/sitemap.xml',
    /**
        * TODO
        */
    hostname: 'https://yozoramel.org',
    routes: [
      {
        url: '/',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date()
      },
      {
        url: '/links',
        changefreq: 'weekly',
        priority: 0.5,
        lastmod: new Date()
      },
      {
        url: '/about',
        changefreq: 'weekly',
        priority: 0.5,
        lastmod: new Date()
      }
    ]
  },
  /*
   ** Build configuration
   */
  build: {
    optimizeCSS: is_production,
    extractCSS: is_production,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
