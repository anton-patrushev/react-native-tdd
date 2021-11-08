import { AppRegistry } from 'react-native';

import App from 'src/core/app/App';
import { initializeDIContainer } from 'src/core/ioc/init';

export const appRegister = () => App;

export default function initApp(appName: string) {
  initializeDIContainer();

  return AppRegistry.registerComponent(appName, appRegister);
}
