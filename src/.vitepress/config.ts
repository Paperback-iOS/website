import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

import enNavigation from './config/nav/en'
import enSidebar from './config/sidebar/en'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Paperback",
  description: "An Ad-Free Comic/Manga Reader for iOS",
  outDir: '../public/',
	
	markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  },

	head: [
		// Embed headers
		["link", { rel: "icon", href: "/favicon.ico" }],
		["link", { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" }],
		["link", { rel: "mask-icon", href: "/icons/safari-pinned-tab.svg", color: "#D21A1C" }],
		["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
		["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
		['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
		["meta", { name: "theme-color", content: "#D21A1C" }],
		["meta", { prefix: "og: http://ogp.me/ns#", property: "og:image", content: "/logo-pb.png" }],
	],

  themeConfig: {
		logo: "/logo-pb.png",
    
    // https://vitepress.dev/reference/default-theme-config
    nav: enNavigation,

    sidebar: enSidebar,

    socialLinks: [
      { icon: 'discord', link: 'https://discord.paperback.moe' },
      { icon: 'twitter', link: 'https://twitter.com/paperbackios' },
			{ icon: 'github', link: 'https://github.com/paperback-ios/website' },
    ]
  }
})
