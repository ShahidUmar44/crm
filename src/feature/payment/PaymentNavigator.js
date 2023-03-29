import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../constants';
import CheckoutScreen from './screens/CheckoutScreen';
import PaymentScreen from './screens/PaymentScreen';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function PaymentNavigator() {
  return (
    <Stack.Navigator initialRouteName={SCREENS.CHECKOUT} screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.CHECKOUT} component={CheckoutScreen} />
      <Stack.Screen name={SCREENS.PAYMENT} component={PaymentScreen} />
    </Stack.Navigator>
  );
}
