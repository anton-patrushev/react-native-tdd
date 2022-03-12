import React from 'react';
import { Text, View } from 'react-native';

import styles from 'src/features/events/screens/Events/styles';

const EventsScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>COMING SOON</Text>
    </View>
  );
};

export default React.memo(EventsScreen);
