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
		collapsable: true,
		children: ["/tools/backup-converter"],
	},
	{
		title: "Extension Development",
		collapsable: true,
		children: [
			"/help/contribution/extension-development/",
			"/help/contribution/extension-development/quickstart",
			"/help/contribution/extension-development/parsing-guide",
			"/help/contribution/extension-development/function-definitions",
			"/help/contribution/extension-development/model-reference",
		]
	}
];
