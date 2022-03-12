import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabScreens } from 'src/features/app/routers/tabs/bottomTab.consts';
import {
  DefaultBottomTabBarOptions,
  EventsScreenOptions,
  FeedScreenOptions,
  SettingsScreenOptions,
} from 'src/features/app/routers/tabs/bottomTab.options';

import FeedScreen from 'src/features/feed/screens/Feed';
import EventsScreen from 'src/features/events/screens/Events';
import SettingsScreen from 'src/features/settings/screens/Settings';

const BottomTab = createBottomTabNavigator();

export const BottomTabRouter = () => {
  return (
    <BottomTab.Navigator screenOptions={DefaultBottomTabBarOptions}>
      <BottomTab.Screen
        name={BottomTabScreens.FEED}
        component={FeedScreen}
        options={FeedScreenOptions}
      />
      <BottomTab.Screen
        name={BottomTabScreens.EVENTS}
        component={EventsScreen}
        options={EventsScreenOptions}
      />
      <BottomTab.Screen
        name={BottomTabScreens.SETTINGS}
        component={SettingsScreen}
        options={SettingsScreenOptions}
      />
    </BottomTab.Navigator>
  );
};
