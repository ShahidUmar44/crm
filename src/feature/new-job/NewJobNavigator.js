import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../constants';
import NewJobContainer from './screens/Newjob';
import CustomerDetailsContainer from '../customer/screens/customer-details';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function NewJobNavigator() {
  return (
    <Stack.Navigator initialRouteName={SCREENS.NEWJOB} screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.NEWJOB} component={NewJobContainer} />
      <Stack.Screen name={SCREENS.CUSTOMER_DETAILS} component={CustomerDetailsContainer} />
    </Stack.Navigator>
  );
}
