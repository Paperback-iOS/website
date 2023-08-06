export default [
	{ text: "Home", link: "/" },
	{ text: "FAQ", link: "/help/faq" },
	{
		text: "Guides",
		collapsable: true,
		items: [
			{ text: "Getting Started", link: "/help/guides/getting-started" },
			{ text: "Discord Support", link: "/help/guides/discord-support" },
			{ text: "Backups", link: "/help/guides/backups" },
			{ text: "Content Settings", link: "/help/guides/content-settings" },
			{ text: "Adding Repositories", link: "/help/guides/adding-repos" }
		]
	},
	{
		text: "Installation",
		collapsable: true,
		items: [
			{ text: "App Store", link: "/help/installation/app-store" },
			{ text: "AltStore", link: "/help/installation/public-altstore" },
			{ text: "Beta TestFlight", link: "/help/installation/beta-testflight" }
		]
	}
];
