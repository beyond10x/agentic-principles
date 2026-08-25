import {usePluginData} from '@docusaurus/useGlobalData';
import type {PrincipleRegistry} from '../generated/principle-registry';

export type {Principle, PrincipleRegistry} from '../generated/principle-registry';

export function usePrinciples(): PrincipleRegistry {
  return usePluginData('principle-data') as PrincipleRegistry;
}
