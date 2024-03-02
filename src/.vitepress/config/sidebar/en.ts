export default [
	{
		text: 'Guides',
		link: '/guides/',
		items: [
			{
				text: 'Getting Started',
				link: '/guides/getting-started/',
				items: [
					{
						text: 'Installation',
						link: '/guides/getting-started/installation/',
					},
					{
						text: 'Changing Content Settings',
						link: '/guides/getting-started/content-settings',
					},
					{
						text: 'Adding Content',
						link: '/guides/getting-started/adding-content',
					},
				],
			},
			{
				text: 'Extra Guides',
				link: '/guides/extra/',
				collapsed: true,
				items: [
					{
						text: 'Your Library',
						link: '/guides/extra/library',
					},
					{
						text: 'Using the Reader',
						link: '/guides/extra/reader',
					},
					{
						text: 'Backing Up Your Data',
						link: '/guides/extra/backups',
					},
					{
						text: 'Connecting Trackers',
						link: '/guides/extra/trackers',
					},
					{
						text: 'Changing the Theme',
						link: '/guides/extra/themes',
					},
				],
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
