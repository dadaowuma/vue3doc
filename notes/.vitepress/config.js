// @see https://vitepress.dev/zh/reference/site-config
export default {
  title: 'vue全家桶文档',
  description: 'vue全家桶文档 vue、vuex、vue-router、pinia',

  // @see https://vitepress.dev/zh/reference/site-config#head
  head: [
    ['script', {}, `console.log('自定义脚本');`],

    ['script', {src: './assets/interact.min.js'}],
    ['script', {src: './assets/apply-interact.js'}],
  ],

  themeConfig: {
    // aside: 'right',
    // @see https://vitepress.dev/zh/reference/default-theme-config#outline
    outline: {
      level: 'deep',
      label: '大纲'
    },
    // @see https://vitepress.dev/zh/reference/default-theme-config#docfooter
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    // @see https://vitepress.dev/zh/reference/default-theme-config#lightmodeswitchtitle
    // @see https://vitepress.dev/zh/reference/default-theme-config#darkmodeswitchtitle
    lightModeSwitchTitle: '浅色模式',
    darkModeSwitchTitle: '深色模式',

    nav: [
      { text: 'vue', link: '/vue' },      
      { text: 'router', link: '/router' },
      { text: 'vuex', link: '/vuex' },
      { text: 'pinia', link: '/pinia' },
      { text: 'capacitor', link: '/capacitor' }
    ],
    sidebar: [
      { text: 'vue', link: '/vue' },      
      { text: 'router', link: '/router' },
      { text: 'vuex', link: '/vuex' },
      { text: 'pinia', link: '/pinia' },
      { text: '回到首页', link: '/back-home' },
      { text: '其他配置', link: '/other-conf'},
      { text: 'capacitor', link: '/capacitor' }
    ]
  }
}