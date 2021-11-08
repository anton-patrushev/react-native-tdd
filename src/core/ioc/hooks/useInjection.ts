import { DIContainer } from '../types/index';

import DI from '../DI';

export default function useInjection<K extends keyof DIContainer>(
  dependency: K,
): DIContainer[K] {
  return DI.getDependency(dependency);
}
