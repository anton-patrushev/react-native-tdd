import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { BottomTabRouter } from 'src/features/app/routers/tabs/BottomTabRouter';

import { NavigationTheme } from 'src/features/app/routers/root/root.consts';

export const RootRouter = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <BottomTabRouter />
    </NavigationContainer>
  );
};
