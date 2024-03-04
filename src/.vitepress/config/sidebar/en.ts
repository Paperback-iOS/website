export default [
	{
		text: 'Getting Started',
		link: '/getting-started/',
		items: [
			{
				text: 'Installation',
				link: '/getting-started/installation/',
			},
			{
				text: 'Changing Content Settings',
				link: '/getting-started/content-settings',
			},
			{
				text: 'Adding Content',
				link: '/getting-started/adding-content/',
				items: [
					{
						text: 'Komga',
						link: '/getting-started/adding-content/komga',
					},
					{
						text: 'Third-Party Extensions',
						link: '/getting-started/adding-content/third-party-extensions',
					},
				],
			},
		],
	},
	{
		text: 'Guides',
		link: '/guides/',
		items: [
			{
				text: 'Your Library',
				link: '/guides/library',
			},
			{
				text: 'Using the Reader',
				link: '/guides/reader',
			},
			{
				text: 'Backing Up Your Data',
				link: '/guides/backups',
			},
			{
				text: 'Connecting Trackers',
				link: '/guides/trackers',
			},
			{
				text: 'Changing the Theme',
				link: '/guides/themes',
			},
			{
				text: 'Further Support',
				link: '/guides/further-support/',
			},
		],
	},
	{
		text: 'FAQ',
		link: '/faq/',
		items: [
			{
				text: 'General',
				link: '/faq/general',
			},
			{
				text: 'Troubleshooting',
				link: '/faq/troubleshooting',
			},
		],
	},
	{
		text: 'Contribute',
		link: '/contribute/',
		items: [
			{
				text: 'Extension Development',
				link: '/contribute/extension-development/',
				items: [
					{
						text: 'Quick Start',
						link: '/contribute/extension-development/quick-start',
					},
					{
						text: 'Reference',
						link: '/contribute/extension-development/reference/',
						collapsed: true,
						items: [
							{
								text: 'Parsing Guide',
								link: '/contribute/extension-development/reference/parsing-guide',
							},
							{
								text: 'Function Definitions',
								link: '/contribute/extension-development/reference/function-definitions',
							},
							{
								text: 'Model Reference',
								link: '/contribute/extension-development/reference/model-reference',
							},
							{
								text: 'Metadata Parameter',
								link: '/contribute/extension-development/reference/metadata',
							},
						],
					},
				],
			},
			{
				text: 'Website Contribution',
				link: '/contribute/website/',
				items: [
					{
						text: 'Quick Start',
						link: '/contribute/website/quick-start',
					},
					{
						text: 'Reference',
						link: '/contribute/website/reference/',
						collapsed: true,
						items: [
							{
								text: 'Markdown Examples',
								link: '/contribute/website/reference/markdown-examples',
							},
							{
								text: 'API Examples',
								link: '/contribute/website/reference/api-examples',
							},
						],
					},
				],
			},
		],
	},
];
