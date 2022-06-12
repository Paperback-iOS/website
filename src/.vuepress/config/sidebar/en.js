module.exports = [
	{title: "Home", path: "/"},
	{title: "FAQ", path: "/help/faq/"},
	{
		title: "Guides",
		collapsable: true,
		children: [
			"/help/guides/getting-started",
			"/help/guides/discord-support",
			"/help/guides/backups",
			"/help/guides/content-settings",
			"/help/guides/adding-repos"
		]
	},
	{
		title: "Installation",
		collapsable: true,
		children: [
			"/help/installation/app-store",
			"/help/installation/public-altstore",
			"/help/installation/public-testflight",
			"/help/installation/beta-testflight"
		]
	},
	{
		title: "Tools",
		collapsable: true,
		children: ["/tools/backup-converter", "/tools/backup-reader", "/tools/md-to-md-migrator"],
	},
];
