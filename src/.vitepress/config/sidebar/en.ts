export default {
  // Show on all pages
  '/': [
    {
      text: 'Getting Started',
      link: '/getting-started/',
      collapsed: false,
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
          collapsed: true,
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
        {
          text: 'Further Support',
          link: '/getting-started/further-support/',
        },
      ],
    },
    {
      text: 'Guides',
      link: '/guides/',
      collapsed: false,
      items: [
        {
          text: 'Using the Reader',
          link: '/guides/reader',
        },
        {
          text: 'Backing up Your Data',
          link: '/guides/backups',
        },
        {
          text: 'Connecting Trackers',
          link: '/guides/trackers',
        },
        {
          text: 'Migrating Extensions',
          link: '/guides/migrating',
        },
        {
          text: 'Merging Titles',
          link: '/guides/merging',
        },
        {
          text: 'Changing the Theme',
          link: '/guides/themes',
        },
      ],
    },
    {
      text: 'FAQ',
      link: '/faq/',
      collapsed: false,
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
    // {
    //   text: 'Tools',
    //   link: '/tools/',
    //   collapsed: true,
    //   items: [
    //     {
    //       text: 'Backup Converter',
    //       link: '/tools/backup-converter',
    //     },
    //     {
    //       text: 'Themes Creator',
    //       link: '/tools/themes-creator',
    //     },
    //   ],
    // },
    {
      text: 'Contributing',
      link: '/contributing/',
      collapsed: false,
      items: [
        {
          text: 'Extension Development',
          link: '/contributing/extensions/',
          items: [
            {
              text: 'Quick Start',
              link: '/contributing/extensions/quick-start',
            },
            {
              text: 'Parsing Guide',
              link: '/contributing/extensions/parsing-guide',
            },
            {
              text: 'v0.7 References',
              link: '/contributing/extensions/0.7/',
            },
            {
              text: 'v0.8 References',
              link: '/contributing/extensions/0.8/',
            },
          ],
        },
        {
          text: 'Website Contribution',
          link: '/contributing/website/',
          items: [
            {
              text: 'Quick Start',
              link: '/contributing/website/quick-start',
            },
            {
              text: 'Reference',
              link: '/contributing/website/reference/',
              collapsed: true,
              items: [
                {
                  text: 'Markdown Examples',
                  link: '/contributing/website/reference/markdown-examples',
                },
                {
                  text: 'API Examples',
                  link: '/contributing/website/reference/api-examples',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  // Version specific sidebar
  '/contributing/extensions/0.7/': [
    {
      text: 'Extension Development',
      link: '/contributing/extensions/',
      collapsed: true,
      items: [
        {
          text: 'Quick Start',
          link: '/contributing/extensions/quick-start',
        },
        {
          text: 'Parsing Guide',
          link: '/contributing/extensions/parsing-guide',
        },
        {
          text: 'v0.8 References',
          link: '/contributing/extensions/0.8/',
        },
      ],
    },
    {
      text: 'v0.7 References',
      link: '/contributing/extensions/0.7/',
      collapsed: false,
      items: [
        {
          text: 'Migrate to v0.8',
          link: '/contributing/extensions/0.7/migrate-to-0.8',
        },
        {
          text: 'Functions',
          link: '/contributing/extensions/0.7/functions',
        },
        {
          text: 'Models',
          link: '/contributing/extensions/0.7/models',
        },
        {
          text: 'Metadata Parameter',
          link: '/contributing/extensions/0.7/metadata',
        },
      ],
    },
  ],
  '/contributing/extensions/0.8/': [
    {
      text: 'Extension Development',
      link: '/contributing/extensions/',
      collapsed: true,
      items: [
        {
          text: 'Quick Start',
          link: '/contributing/extensions/quick-start',
        },
        {
          text: 'Parsing Guide',
          link: '/contributing/extensions/parsing-guide',
        },
        {
          text: 'v0.7 References',
          link: '/contributing/extensions/0.7/',
        },
      ],
    },
    {
      text: 'v0.8 References',
      link: '/contributing/extensions/0.8/',
      collapsed: false,
      items: [
        {
          text: 'Functions',
          link: '/contributing/extensions/0.8/functions',
        },
      ],
    },
  ],
}
