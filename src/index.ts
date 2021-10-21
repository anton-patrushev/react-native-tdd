import { AppRegistry } from 'react-native';

import App from 'src/app/components/App';

export default function initApp(appName: string) {
  return AppRegistry.registerComponent(appName, () => App);
}
