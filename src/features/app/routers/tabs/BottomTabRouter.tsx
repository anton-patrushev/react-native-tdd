import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabScreens } from 'src/features/app/routers/tabs/bottomTab.consts';
import {
  EventsScreenOptions,
  FeedScreenOptions,
} from 'src/features/app/routers/tabs/bottomTab.options';

import FeedScreen from 'src/features/feed/screens/Feed';
import EventsScreen from 'src/features/events/screens/Events';

const BottomTab = createBottomTabNavigator();

export const BottomTabRouter = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000000' },
        tabBarIcon: () => null,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: { fontSize: 14, paddingBottom: 14 },
      }}>
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
    </BottomTab.Navigator>
  );
};
