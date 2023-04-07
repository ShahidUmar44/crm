import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme';
import { SCREENS } from '../constants';
import HomeNavigator from '../feature/home/HomeNavigator';
import ChatNavigator from '../feature/chat/ChatNavigator';
import ScheduleNavigator from '../feature/schedule/ScheduleNavigator';
import CustomerNavigator from '../feature/customer/CustomerNavigator';
import SettingsNavigator from '../feature/settings/SettingsNavigator';

import HomeIcon from '../../assets/images/home-icon.svg';
import ChatIcon from '../../assets/images/chat-icon.svg';
import ScheduleIcon from '../../assets/images/schedule-icon.svg';
import CustomerIcon from '../../assets/images/customer-icon.svg';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      tabBarInactiveTintColor
      tabBarHideOnKeyboard={true}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryDarker,
        tabBarInactiveTintColor: colors.primary,
        tabBarStyle: {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: colors.whiteBackground,
        },
      }}
      initialRouteName={SCREENS.HOMENAVIGATOR}>
      <Tab.Screen
        name={SCREENS.HOMENAVIGATOR}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => <HomeIcon opacity={focused ? 1 : 0.4} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.CHATNAVIGATOR}
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ focused }) => <ChatIcon opacity={focused ? 1 : 0.4} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.SCHEDULE}
        component={ScheduleNavigator}
        options={{
          tabBarIcon: ({ focused }) => <ScheduleIcon opacity={focused ? 1 : 0.4} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.CUSTOMER}
        component={CustomerNavigator}
        options={{
          tabBarIcon: ({ focused }) => <CustomerIcon opacity={focused ? 1 : 0.4} />,
        }}
      />

      <Tab.Screen
        name={SCREENS.SETTINGS}
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="options-outline" size={24} color={focused ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.4)'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
