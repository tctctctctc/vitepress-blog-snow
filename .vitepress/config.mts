import { defineConfigWithTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
  title: "Tang's Blog",
  description: "工作、生活、学习记录",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🏡首页', link: '/' }
    ],
    /** 社交链接 */
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    /** logo */
    logo: '/images/head.jpg',
    /** 页脚配置 */
    footer: {
      message: '这是一个页脚的信息',
      copyright: 'CopyRight'
    },
    /** head标签 */
    head: [['link', { rel: 'icon', href: '/images/head.jpg' }]]
  }
})
