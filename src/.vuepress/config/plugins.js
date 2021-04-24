module.exports = [
	["@vuepress/back-to-top"],
	["element-ui"],
	/* Essentials */
	["clean-urls", { normalSuffix: "/" }],
	["@vuepress/google-analytics", { ga: "UA-148427628-2" }],
	/* Containers */
	[
		"vuepress-plugin-container",
		{
			type: "expander",
			before: (info) =>
				`<details class="expander"><summary class="expansion">${info}</summary>`,
			after: "</details>",
		},
	],
	[
		"vuepress-plugin-container",
		{
			type: "guide",
			before: (info) => `<div class="guide"><p class="title">${info}</p>`,
			after: "</div>",
		},
	],
	[
		"vuepress-plugin-container",
		{
			type: "linkedcode",
			before: (info) => `<CodeLinked language="${info}">`,
			after: "</CodeLinked>",
		},
	],
	[
		"vuepress-plugin-container",
		{
			type: "aside",
			defaultTitle: "",
		},
	],
	[
		"vuepress-plugin-container",
		{
			type: "aside-guide",
			defaultTitle: "",
		},
	],
	[
		"sitemap",
		{
			hostname: "https://paperback.moe",
			exclude: ["/404.html"],
		},
	],
	[
		"robots",
		{
			host: "https://paperback.moe",
			sitemap: "/sitemap.xml",
			policies: [
				{
					userAgent: "*",
					disallow: ["/uwu/"],
				},
			],
		},
	],
];
