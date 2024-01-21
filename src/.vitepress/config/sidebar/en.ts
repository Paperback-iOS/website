export default [
	{ text: "Home", link: "/" },
	{ text: "FAQ", link: "/help/faq" },
	{
		text: "Frequently Asked Questions",
		collapsable: true,
		items: [
			{ text: "Getting Started", link: "/help/guides/getting-started" },
			{ text: "Discord Support", link: "/help/guides/discord-support" },
			{ text: "Paperback Account", link: "/help/guides/paperbackaccount" },
			{ text: "Patreon Access", link: "/help/guides/patreon" },
		]
	},
	{
		text: "Guides",
		collapsable: true,
		items: [
			{ text: "Backups", link: "/help/guides/backups" },
			{ text: "Content Settings", link: "/help/guides/content-settings" },
			{ text: "Adding Repositories", link: "/help/guides/adding-repos" },
			{ text: "Migration", link: "/help/guides/migration" },
		]
	},
];
