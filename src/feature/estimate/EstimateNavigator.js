import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../constants';
import EstimateScreenContainer from './screens/Estimate';
import CustomerDetailsContainer from '../customer/screens/customer-details/CustomerDetailsContainer';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function EstimateNavigator() {
  return (
    <Stack.Navigator initialRouteName={SCREENS.ESTIMATE} screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.ESTIMATE} component={EstimateScreenContainer} />
      <Stack.Screen name={SCREENS.CUSTOMER_DETAILS} component={CustomerDetailsContainer} />
    </Stack.Navigator>
  );
}
