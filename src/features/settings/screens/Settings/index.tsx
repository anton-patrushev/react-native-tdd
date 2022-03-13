import React from 'react';
import { Text, View } from 'react-native';

import styles from 'src/features/settings/screens/Settings/styles';
import useInjection from 'src/core/ioc/hooks/useInjection';
import { ENV_MODULE_IDENTIFIERS } from 'src/domains/info/ioc/modules/env.symbols';
import { IEnvInfoService } from 'src/domains/info/services/env/IEnvInfoService';

// TODO: show env info
const SettingsScreen = () => {
  const envInfoService = useInjection<IEnvInfoService>(
    ENV_MODULE_IDENTIFIERS.ENV_INFO_SERVICE,
  );

  const envName = envInfoService.getEnvName();
  const apiBaseURL = envInfoService.getBaseApiURL();
  const someAnalyticsKey = envInfoService.getSomeAnalyticsKey();

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Env Info</Text>
      <View style={styles.envInfo}>
        <Text style={styles.text}>
          Environment name:
          <Text style={styles.envValue}>{` ${envName}`}</Text>
        </Text>

        <Text style={styles.text}>
          Base API URL:
          <Text style={styles.envValue}>{` ${apiBaseURL}`}</Text>
        </Text>

        <Text style={styles.text}>
          Some analytics key:
          <Text style={styles.envValue}>{` ${someAnalyticsKey}`}</Text>
        </Text>
      </View>
    </View>
  );
};

export default React.memo(SettingsScreen);
