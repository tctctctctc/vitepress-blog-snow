import { defineConfigWithTheme } from 'vitepress'
import { getMDFilesWithFrontmatter } from './theme/utils'

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
  /** 站名 */
  title: "Tang's Blog",
  /** 网站描述 */
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
    /** 博客 */
    blogs: getMDFilesWithFrontmatter('blogs'),

  },
  /** 部署根目录 */
  base: '/docs/',
  /** head标签 */
  head: [['link', { rel: 'icon', href: '/docs/images/head.jpg' }]],
})
