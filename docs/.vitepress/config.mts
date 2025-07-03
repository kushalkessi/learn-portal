import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "E-Learning",
  // base: '//',
  lang: 'en-US',
  description: "Join Antarikchya Pratisthan Nepal’s courses on Google Earth Engine, R Programming, HEC RAS and HEC HMS for Flood Modelling, Educational Cube and STEM Bootcamps to build skills in satellite technology and data science.",

  markdown: {
    config: (md) => {
      md.use(mathjax3)
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/apn.png' }] 
  ],

  themeConfig: {
    logo: { src: './images/ebook thumb.jpg'},
    // https://vitepress.dev/reference/default-theme-config

    search: {
      provider: 'algolia',
      options: {
        appId: '8J64VVRP8K',
        apiKey: '52f578a92b88ad6abde815aae2b0ad7c',
        indexName: 'vitepress'
      }
    },

    nav: [
      { text: 'Antarikchya', link: 'https://antarikchya.org.np/' },
      {
        text: 'E-Learning',
        items: [
          { text: 'E-Cube', link: 'ecube/' },
          { text: 'GEE', link: 'gee/' },
          { text: 'R', link: 'r/' },
          { text: 'Python', link: 'python/' },
          { text: 'HEC-RAS', link: 'hecras/' },
          { text: 'HEC-HMS', link: 'hechms/' },
        ]
      },

      { text: 'Connect', link: '/connect' },

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Antarikchya-Prathisthan-Nepal'},
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/antarikchya/'},
      { icon: 'facebook', link: 'https://www.facebook.com/antarikchya'},
      { icon: 'instagram', link: 'https://www.instagram.com/antarikchya/'},
      { icon: 'x', link: 'https://x.com/antarikchya'}
    ], 

    editLink: {
      pattern: 'https://github.com/kushalkessi',
      text: 'Edit this page on GitHub'
    },

     lastUpdated: {
      text: 'Last updated on',
    },

    outline: [2, 3], // shows h2 and h3 in TOC

    footer: {
      message: 'GEE User Guide',
      copyright: `Copyright © ${new Date().getFullYear()} Antarikchya`
    },
  }
})