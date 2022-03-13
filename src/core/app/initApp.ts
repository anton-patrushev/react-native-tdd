import { AppRegistry } from 'react-native';

import App from 'src/core/app/App';
import { initializeDIContainer } from 'src/core/ioc/container/init';

import { ENVIRONMENT_CONFIG } from 'src/core/env/config';

export const appRegister = () => App;

export default async function initApp(appName: string) {
  await initializeDIContainer();

  console.log(ENVIRONMENT_CONFIG.ENVIRONMENT);
  console.log(ENVIRONMENT_CONFIG.API_BASE);
  console.log(ENVIRONMENT_CONFIG.SOME_ANALYTICS_KEY);

  console.log(process);

  return AppRegistry.registerComponent(appName, appRegister);
}
