module.exports = [
	{ title: "Home", path: "/" },
	{ title: "FAQ", path: "/help/faq/" },
	{
		title: "Guides",
		collapsable: false,
		children: ["/help/guides/getting-started", "/help/guides/adding-repos"],
	},
	{
		title: "Tools",
		collapsable: false,
		children: ["/tools/backup-converter", "/tools/md-to-md-migrator"],
	},
];
