module.exports = {
	dest: "./public",
	temp: "./node_modules/.temp/theme",
	theme: "yuu",

	// prettier-ignore
	head: [
		["link", { rel: "icon", href: "/favicon.ico" }],
		["link", { rel: "manifest", href: "/manifest.json" }],
		["link", { rel: "apple-touch-icon", href: "/icons/apple-touch-icon-152x152.png" }],
		["link", { rel: "mask-icon", href: "/icons/safari-pinned-tab.svg", color: "#D21A1C" }],
		["meta", { prefix: "og: http://ogp.me/ns#", property: "og:image", content: "https://paperback.moe/icons/logo.png" }],
		["meta", { name: "theme-color", content: "#D21A1C" }],
		["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
		["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
		["meta", { name: "msapplication-TileImage", content: "/icons/msapplication-icon-144x144.png" }],
		["meta", { name: "msapplication-TileColor", content: "#D21A1C" }]
	],

	locales: {
		"/": {
			lang: "en-US",
			title: "Paperback",
			description: "An ad-free manga reader for iOS.",
		},
		"/fr/": {
			lang: "fr-FR",
			title: "Paperback",
			description: "Un lecteur de manga, sur iOS, sans publicités.",
		},
		"/it/": {
			lang: "it-IT",
			title: "Paperback",
			description: "Un lettore di manga per iOS, senza pubblicità.",
		},
		"/nl/": {
			lang: "nl-NL",
			title: "Paperback",
			description: "Een advertentievrije manga-lezer voor iOS.",
		},
	},

	themeConfig: {
		logo: "/icons/logo-alt.svg",
		docsDir: "src",
		repo: "Paperback-iOS/app",
		docsRepo: "Paperback-iOS/website",
		editLinks: true,
		displayAllHeaders: true,
		sidebarDepth: 1,
		editLinkText: "Help us improve this page",
		lastUpdated: "Last updated",
		locales: {
			"/": {
				label: "English",
				selectText: "Languages",
				artiaLabel: "Select language",
				nav: require("./config/nav/en"),
				sidebar: require("./config/sidebar/en"),
			},
			"/fr/": {
				label: "Français",
				selectText: "Langues",
				artiaLabel: "Choisir la langue",
				editLinkText: "Aidez-nous à améliorer cette page",
				lastUpdated: "Dernière mise à jour",
				nav: require("./config/nav/fr"),
				sidebar: require("./config/sidebar/fr"),
			},
			"/it/": {
				label: "Italiano",
				selectText: "Lingue",
				artiaLabel: "Scegliere la lingua",
				editLinkText: "Aiutaci a migliorare la pagina!",
				lastUpdated: "Ultimo aggiornamento",
				nav: require("./config/nav/it"),
				sidebar: require("./config/sidebar/it"),
			},
			"/nl/": {
				label: "Nederlands",
				selectText: "Talen",
				artiaLabel: "Kies een taal",
				editLinkText: "Help ons deze pagina te verbeteren",
				lastUpdated: "Laatst bijgewerkt",
				nav: require("./config/nav/nl"),
				sidebar: require("./config/sidebar/nl"),
			},
		},
		yuu: {
			defaultDarkTheme: true,
			disableThemeIgnore: true,
			colorThemes: ["red", "purple"],
		},
	},

	plugins: require("./config/plugins"),
	extraWatchFiles: [
		".vuepress/config/plugins.js",
		".vuepress/config/nav/en.js",
		".vuepress/config/nav/fr.js",
		".vuepress/config/nav/it.js",
		".vuepress/config/nav/nl.js",
		".vuepress/config/sidebar/en.js",
		".vuepress/config/sidebar/fr.js",
		".vuepress/config/sidebar/it.js",
		".vuepress/config/sidebar/nl.js",
	],
};
