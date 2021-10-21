import { AppRegistry } from 'react-native';

import App from 'src/app/components/App';
import { initializeDIContainer } from './app/utils/initializeDI';

export default function initApp(appName: string) {
  initializeDIContainer();

  return AppRegistry.registerComponent(appName, () => App);
}
