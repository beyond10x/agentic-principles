import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import principleDataPlugin from './plugins/principle-data/index';
import docsSystemPlugin, {ecosystemFooterGroup, ecosystemNavbarItems} from '@beyond10x/docs-system/docusaurus';

const config: Config = {
  title: 'Agentic Principles',
  tagline: 'Evidence for safe, efficient agentic work',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://beyond10x.github.io',
  baseUrl: '/agentic-principles/',
  organizationName: 'beyond10x',
  projectName: 'agentic-principles',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [principleDataPlugin, docsSystemPlugin],

  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: 'research',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/beyond10x/agentic-principles/edit/main/docs/',
          showLastUpdateTime: true,
        },
        blog: {
          path: '../blog',
          routeBasePath: 'blog',
          blogTitle: 'Field notes',
          blogDescription:
            'Short, evidence-first notes from the agentic-principles research program.',
          blogSidebarTitle: 'Recent notes',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          postsPerPage: 10,
          editUrl:
            'https://github.com/beyond10x/agentic-principles/edit/main/blog/',
          onInlineTags: 'throw',
          onInlineAuthors: 'throw',
          onUntruncatedBlogPosts: 'throw',
          feedOptions: {
            type: 'all',
            title: 'Agentic Principles field notes',
            description:
              'Evidence-first notes on safe, efficient agentic work automation.',
            copyright: `© ${new Date().getFullYear()} beyond10x`,
            xslt: true,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    metadata: [
      {
        name: 'keywords',
        content:
          'agentic systems, AI agents, software factory, SRE automation, customer support, safety, reliability',
      },
    ],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Agentic Principles',
      hideOnScroll: true,
      logo: {
        alt: 'Agentic Principles mark',
        src: 'img/mark.svg',
      },
      items: [
        ...ecosystemNavbarItems(),
        {
          to: '/principles',
          label: 'Principles',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'researchSidebar',
          label: 'Research',
          position: 'left',
        },
        {
          to: '/research/VISION#the-research-loop',
          label: 'Method',
          position: 'left',
        },
        {
          to: '/blog',
          label: 'Field notes',
          position: 'left',
        },
        {
          href: 'https://github.com/beyond10x/agentic-principles',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        ecosystemFooterGroup(),
        {
          title: 'Explore',
          items: [
            {label: 'Start here', to: '/research'},
            {label: 'Field notes', to: '/blog'},
            {label: 'Principle catalog', to: '/principles'},
            {label: 'Strongest current study', to: '/research/research/2026-08-25T023000+0200_scoped-progress-under-partial-failure'},
            {label: 'Research method', to: '/research/VISION#the-research-loop'},
          ],
        },
        {
          title: 'Understand',
          items: [
            {label: 'Evidence labels', to: '/research/#how-to-read-an-evidence-label'},
            {label: 'Research vision', to: '/research/VISION'},
            {label: 'Scope and boundaries', to: '/research/VISION#what-this-repository-is-not'},
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub repository',
              href: 'https://github.com/beyond10x/agentic-principles',
            },
            {
              label: 'beyond10x ecosystem',
              href: 'https://beyond10x.github.io/getting-started/ecosystem',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} beyond10x · Evidence before autonomy.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
