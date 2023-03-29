import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../constants';
import ChatScreen from './screens/ChatScreen';
import ChatInboxListScreen from './screens/ChatInboxListScreen';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function ChatNavigator() {
  return (
    <Stack.Navigator initialRouteName={SCREENS.CHAT_INBOX_LIST} screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.CHAT_INBOX_LIST} component={ChatInboxListScreen} />
      <Stack.Screen name={SCREENS.CHAT} component={ChatScreen} />
    </Stack.Navigator>
  );
}
