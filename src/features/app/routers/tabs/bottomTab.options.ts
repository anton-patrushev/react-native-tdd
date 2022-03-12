import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabLabels } from 'src/features/app/routers/tabs/bottomTab.dictionary';
import { BottomTabScreens } from 'src/features/app/routers/tabs/bottomTab.consts';

export const DefaultBottomTabBarOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: { backgroundColor: '#000000' },
  tabBarIcon: () => null,
  tabBarLabelPosition: 'below-icon',
  tabBarLabelStyle: { fontSize: 14, paddingBottom: 14 },
};

export const FeedScreenOptions: BottomTabNavigationOptions = {
  tabBarLabel: BottomTabLabels[BottomTabScreens.FEED],
  headerShown: true,
  headerStyle: { backgroundColor: '#000000' },
  headerTitleStyle: { color: '#FFFFFF' },
  headerTitle: BottomTabLabels[BottomTabScreens.FEED],
};

export const EventsScreenOptions: BottomTabNavigationOptions = {
  tabBarLabel: BottomTabLabels[BottomTabScreens.EVENTS],
};

export const SettingsScreenOptions: BottomTabNavigationOptions = {
  tabBarLabel: BottomTabLabels[BottomTabScreens.SETTINGS],
};
