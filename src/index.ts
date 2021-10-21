import { AppRegistry } from 'react-native';

import App from './app/App';

export default function initApp(appName: string) {
  return AppRegistry.registerComponent(appName, () => App);
}
