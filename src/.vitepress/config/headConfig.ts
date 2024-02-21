import type { HeadConfig } from 'vitepress';

const headConfig: HeadConfig[] = [
	['meta', { name: 'darkreader-lock' }],

	['meta', { name: 'theme-color', content: '#f64b4b' }],
	['meta', { name: 'msapplication-TileColor', content: '#f64b4b' }],

	[
		'meta',
		{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
	],
	['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],

	[
		'link',
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		}
	],
	[
		'link',
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicon-32x32.png'
		}
	],
	[
		'link',
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicon-16x16.png'
		}
	],
	[
		'link',
		{
			rel: 'apple-touch-icon',
			type: 'image/png',
			sizes: '180x180',
			href: '/apple-touch-icon.png'
		}
	],

	['link', { rel: 'manifest', href: '/site.webmanifest' }],

	['meta', { name: 'twitter:card', content: 'summary' }],
	['meta', { name: 'twitter:site', content: '@paperbackios' }],
	['meta', { property: 'twitter:title', content: 'Paperback' }],
	['meta', { property: 'twitter:image', content: '/pb-logo.svg' }],
	[
		'meta',
		{
			name: 'twitter:description',
			content: 'An Ad-Free Comic/Manga Reader for iOS'
		}
	],

	['meta', { property: 'og:title', content: 'Paperback' }],
	['meta', { property: 'og:type', content: 'website' }],
	['meta', { property: 'og:image', content: '/pb-logo.svg' }],
	['meta', { property: 'og:url', content: 'https://paperback.moe' }],
	[
		'meta',
		{
			property: 'og:description',
			content: 'An Ad-Free Comic/Manga Reader for iOS'
		}
	]
];

export default headConfig;
