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
      { text: '🏡首页', link: '/' },
      { text: '🔖标签', link: '/tags' },
      { text: '📃归档', link: '/archives' }
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
    /** 最后更新-文本 */
    lastUpdatedText: '最后更新时间',
    /** pageSize */
    pageSize: 5,
    /** 大纲级别 */
    outline: [2, 5],
    /** 深浅主题切换显示文本 */
    darkModeSwitchLabel: '主题',
    /** 深色模式下主题切换开关悬停显示的文本 */
    lightModeSwitchTitle: '切换到浅色模式',
    /** 浅色模式下主题切换开关悬停显示的文本 */
    darkModeSwitchTitle: '切换到深色模式',
    /** 回到顶部文本 */
    returnToTopLabel: '回到顶部',
    /** 本地搜索 */
    search: {
      provider: 'local'
    },
    /** 个人简介 */
    profile: {
      name: 'Tang',
      slogan: '言念君子，温其如玉'
    },
    /** twikoo评论配置 */
    twikoo: {
      envId: '',
      showHome: true
    }
  },
  /** 部署根目录 */
  base: '/docs/',
  /** head标签 */
  head: [['link', { rel: 'icon', href: '/docs/images/head.jpg' }]],
  /** 最后更新于 */
  lastUpdated: true
})
