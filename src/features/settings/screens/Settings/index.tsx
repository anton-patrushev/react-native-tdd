import React from 'react';
import { Text, View } from 'react-native';

import styles from 'src/features/settings/screens/Settings/styles';

// TODO: show env info
const SettingsScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
};

export default React.memo(SettingsScreen);
