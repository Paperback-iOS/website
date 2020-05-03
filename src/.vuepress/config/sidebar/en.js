module.exports = [
	{ title: "Home", path: "/" },
	{ title: "FAQ", path: "/help/faq/" },
	{
		title: "Guides",
		collapsable: false,
		children: [
			"/help/guides/getting-started",
		],
	},
]