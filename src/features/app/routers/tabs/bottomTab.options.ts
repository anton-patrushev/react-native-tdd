import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabLabels } from 'src/features/app/routers/tabs/bottomTab.dictionary';
import { BottomTabScreens } from 'src/features/app/routers/tabs/bottomTab.consts';

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
