module.exports = [
	{title: "Home", path: "/"},
	{title: "FAQ", path: "/help/faq/"},
	{
		title: "Guides",
		collapsable: true,
		children: ["/help/guides/getting-started", "/help/guides/adding-repos"],
	},
	{
		title: "Tools",
		collapsable: false,
		children: ["/tools/backup-converter"],
	},
	{
		title: "Source Development",
		collapsable: true,
		children: [
			"/help/guides/extension-development/intro-to-sources",
			"/help/guides/extension-development/cheerio-quickstart",
			"/help/guides/extension-development/metadata/",
			"/help/guides/extension-development/function-definitions",
			"/help/guides/extension-development/model-reference"
		]
	}
];
