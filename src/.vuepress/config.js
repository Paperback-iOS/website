const ogPrefix = "og: http://ogp.me/ns#";
const ogTitle = "Paperback";
const ogDescription = "An ad-free manga reader for iOS.";
const ogColor = "#D12020";

module.exports = {
	dest: "./public",
	temp: "./node_modules/.temp/theme",
	theme: "yuu",

	// prettier-ignore
	head: [
		["link", { rel: "icon", href: "/favicon.ico" }],
		["link", { rel: "manifest", href: "/manifest.json" }],
		["meta", { prefix: ogPrefix, property: "og:url", content: "https://paperback.moe/" }],
		["meta", { prefix: ogPrefix, property: "og:image", content: "https://paperback.moe/logo.png" }],
		["meta", { prefix: ogPrefix, property: "og:type", content: "website" }],
		["meta", { prefix: ogPrefix, property: "og:title", content: ogTitle }],
		["meta", { prefix: ogPrefix, property: "og:description", content: ogDescription }],
		["meta", { prefix: ogPrefix, property: "twitter:title", content: ogTitle }],
		["meta", { name: "theme-color", content: ogColor }],
		["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
		["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
		["link", { rel: "apple-touch-icon", href: `/img/apple-touch-icon.png` }],
		["link", { rel: "mask-icon", href: "/img/safari-pinned-tab.svg", color: ogColor }],
		["meta", { name: "msapplication-TileImage", content: "/img/mstile-150x150.png" }],
		["meta", { name: "msapplication-TileColor", content: ogColor }],
	],

	locales: {
		"/": {
			lang: "en-US",
			title: ogTitle,
			description: ogDescription,
		},
		"/fr/": {
			lang: "fr-FR",
			title: ogTitle,
			description: "Un lecteur de manga, sur iOS, sans publicités.",
		},
		"/it/": {
			lang: "it-IT",
			title: ogTitle,
			description: "Un lettore di manga per iOS, senza pubblicità.",
		},
	},

	themeConfig: {
		logo: "/logo-alt.svg",
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
				serviceWorker: {
					updatePopup: {
						message: "New content is available.",
						buttonText: "Refresh",
					},
				},
			},
			"/fr/": {
				label: "Français",
				selectText: "Langues",
				artiaLabel: "Choisir la langue",
				editLinkText: "Aidez-nous à améliorer cette page",
				lastUpdated: "Dernière mise à jour",
				nav: require("./config/nav/fr"),
				sidebar: require("./config/sidebar/fr"),
				serviceWorker: {
					updatePopup: {
						message: "Du nouveau contenu est disponible.",
						buttonText: "Actualiser",
					},
				},
			},
			"/it/": {
				label: "Italiano",
				selectText: "Lingue",
				artiaLabel: "Scegliere la lingua",
				editLinkText: "Aiutaci a migliorare la pagina!",
				lastUpdated: "Ultimo aggiornamento",
				nav: require("./config/nav/it"),
				sidebar: require("./config/sidebar/it"),
				serviceWorker: {
					updatePopup: {
						message: "Nuovi contenuti disponibili.",
						buttonText: "Aggiorna",
					},
				},
			},
		},
		yuu: {
			defaultDarkTheme: true,
			disableThemeIgnore: true,
			colorThemes: ["blue", "purple"],
		},
	},

	plugins: require("./config/plugins"),
	extraWatchFiles: [
		".vuepress/config/plugins.js",
		".vuepress/config/nav/en.js",
		".vuepress/config/nav/fr.js",
		".vuepress/config/nav/it.js",
		".vuepress/config/sidebar/en.js",
		".vuepress/config/sidebar/fr.js",
		".vuepress/config/sidebar/it.js",
	],
};
