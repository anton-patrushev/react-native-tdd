import Config from 'react-native-config';

import { EnvironmentConfig, EnvironmentNames } from 'src/core/env/types';

export const ENVIRONMENT_CONFIG: EnvironmentConfig = {
  ENVIRONMENT: Config.ENVIRONMENT as EnvironmentNames,
  API_BASE: Config.API_BASE,
  SOME_ANALYTICS_KEY: Config.SOME_ANALYTICS_KEY,
};
