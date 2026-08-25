import fs from 'node:fs/promises';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import type {PrincipleRegistry} from '../../src/generated/principle-registry';

export default function principleDataPlugin(
  context: LoadContext,
): Plugin {
  const registryPath = path.resolve(context.siteDir, '../docs/principles.json');

  return {
    name: 'principle-data',
    getPathsToWatch: () => [registryPath],
    async loadContent() {
      return JSON.parse(
        await fs.readFile(registryPath, 'utf8'),
      ) as PrincipleRegistry;
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData(content as PrincipleRegistry);
    },
  };
}
