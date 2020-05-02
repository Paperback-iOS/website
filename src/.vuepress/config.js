module.exports = {
	title: "Paperback",
	description: "An ad-free manga reader for iOS.",
	dest: "./public",
	themeConfig: {
		nav: require("./config/nav"),
		sidebar: [
			{
				title: "Home",
				path: "/",
			},
			{
				title: "FAQ",
				path: "/help/faq/",
			},
			{
				title: "Guides",
				collapsable: false,
				children: ["/help/guides/getting-started"],
			},
		],
		displayAllHeaders: true,
		sidebarDepth: 1,
		repo: "Paperback-iOS/Paperback",
		docsRepo: "Paperback-iOS/website",
		docsDir: "src",
		logo: "/assets/logo.png",
		editLinks: true,
		editLinkText: "Help us improve this page",
		lastUpdated: "Last Updated",
	},
	plugins: require("./config/plugins"),
	extraWatchFiles: [".vuepress/config/nav.js", ".vuepress/config/plugins.js"],
};
