module.exports = [
	{title: "Home", path: "/"},
	{title: "FAQ", path: "/help/faq/"},
	{
		title: "Guides",
		collapsable: true,
		children: ["/help/guides/getting-started", "/help/guides/adding-repos"],
	},
	{
		title: "Installation",
		collapsable: true,
		children: [
			"/help/installation/public-testflight",
			"/help/installation/public-altstore",
			"/help/installation/beta-testflight"
		]
	},
	{
		title: "Tools",
		collapsable: true,
		children: ["/tools/backup-converter", "/tools/md-to-md-migrator"],
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
			"/help/contribution/extension-development/metadata",
		]
	}
];
