import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  researchSidebar: [
    {type: 'doc', id: 'index', label: 'Start here'},
    {
      type: 'link',
      label: 'Principle catalog',
      href: '/principles',
    },
    {type: 'doc', id: 'VISION', label: 'Research vision and method'},
    {
      type: 'category',
      label: 'Studies and research notes',
      collapsed: false,
      items: [
        'research/2026-08-25T023000+0200_scoped-progress-under-partial-failure',
        'research/2026-08-25T005715+0200_fix-the-source-not-the-adopter',
        'research/2026-08-25T004318+0200_engineering-protocols-workflow-fit',
        'research/2026-08-25T001928+0200_seed',
        'research/2026-08-25T001613+0200_seed',
      ],
    },
    {
      type: 'category',
      label: 'Evidence for the partial-failure study',
      collapsed: true,
      items: [
        'research/evidence/scoped-progress-partial-failure/README',
        'research/evidence/scoped-progress-partial-failure/analysis',
        'research/evidence/scoped-progress-partial-failure/sources',
      ],
    },
  ],
};

export default sidebars;
