module.exports = [
	{ text: "Home", link: "/" },
	{ text: "FAQ", link: "/help/faq/" },
	{
		text: "Guides",
		items: [
			{
				text: "Guides",
				items: [
					{
						text: "Getting started",
						link: "/help/guides/getting-started/",
					},
					{
						text: "External Repositories",
						link: "/help/guides/adding-repos/",
					},
				],
			},
		],
	},
	{
		text: "Tools",
		items: [
			{
				text: "Tools",
				items: [
					{
						text: "Backup Converter",
						link: "/tools/backup-converter/",
					},
				],
			},
		],
	},
	{
		text: "Links",
		items: [
			{
				text: "Community",
				items: [
					{ text: "Discord", link: "https://discord.gg/Ny83JV3" },
					{ text: "Reddit", link: "https://reddit.com/r/Paperback" },
					{
						text: "Twitter",
						link: "https://twitter.com/paperbackios",
					},
				],
			},
			{
				text: "Sponsor",
				items: [
					{
						text: "Patreon",
						link: "https://www.patreon.com/FaizanDurrani",
					},
				],
			},
		],
	},
	{
		text: "Development",
		items: [
			{
				text: "Sources Introduction",
				link: "/help/guides/extension-development/intro-to-sources/"
			},
			{
				text: "Parsing Quickstart",
				link: "/help/guides/extension-development/cheerio-quickstart/"
			},
			{
				text: "Function Definitions",
				link: "/help/guides/extension-development/function-definitions/"
			}
		]
	}
];
