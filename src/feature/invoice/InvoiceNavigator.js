import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../constants';

import InvoiceScreen from './screens/InvoiceScreen';
import AddInvoiceScreen from './screens/AddInvoiceScreen';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function InvoiceNavigator() {
  return (
    <Stack.Navigator initialRouteName={SCREENS.INVOICE} screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.INVOICE_SCREEN} component={InvoiceScreen} />
      <Stack.Screen name={SCREENS.ADD_INVOICE} component={AddInvoiceScreen} />
    </Stack.Navigator>
  );
}
