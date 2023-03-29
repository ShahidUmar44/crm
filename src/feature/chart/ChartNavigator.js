import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../constants';
import ChartScreen from './screens/ChartScreen';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function ChartNavigator() {
  return (
    <Stack.Navigator initialRouteName={SCREENS.CHART} screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.CHART} component={ChartScreen} />
    </Stack.Navigator>
  );
}
