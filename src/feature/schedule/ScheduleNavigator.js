import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../constants';
import ScheduleScreen from './screens/ScheduleScreen';
import JobDetailsCotainer from '../job-details/screens/JobDetails';
import InvoiceScreenContainer from '../invoice/screens/InvoiceScreen';
import AddInvoiceScreenContainer from '../invoice/screens/AddInvoiceScreen';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function ScheduleNavigator() {
  return (
    <Stack.Navigator initialRouteName={SCREENS.SCHEDULESCREEN} screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.SCHEDULESCREEN} component={ScheduleScreen} />
      <Stack.Screen name={SCREENS.JOBDETAILS} component={JobDetailsCotainer} />
      <Stack.Screen name={SCREENS.INVOICE_SCREEN} component={InvoiceScreenContainer} />
      <Stack.Screen name={SCREENS.ADD_INVOICE} component={AddInvoiceScreenContainer} />
    </Stack.Navigator>
  );
}
