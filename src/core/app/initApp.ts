import { AppRegistry } from 'react-native';

import App from 'src/core/app/App';
import { initializeDIContainer } from 'src/core/ioc/container/init';

export const appRegister = () => App;
// bla-bla-bla for testing
// bla-bla-bla for testing 2

export default async function initApp(appName: string) {
  await initializeDIContainer();

  return AppRegistry.registerComponent(appName, appRegister);
}
