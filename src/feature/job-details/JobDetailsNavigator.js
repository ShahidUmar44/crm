import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../constants';
import JobDetailsCotainer from './screens/JobDetails';
import ChatScreenContainer from '../chat/screens/ChatScreen';
import InvoiceScreenContainer from '../invoice/screens/InvoiceScreen';
import PaymentScreenContainer from '../payment/screens/PaymentScreen';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function JobDetailsNavigator() {
  return (
    <Stack.Navigator initialRouteName={SCREENS.JOBDETAILS} screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.JOBDETAILS} component={JobDetailsCotainer} />
      <Stack.Screen name={SCREENS.CHAT} component={ChatScreenContainer} />
      <Stack.Screen name={SCREENS.INVOICE_SCREEN} component={InvoiceScreenContainer} />
      <Stack.Screen name={SCREENS.PAYMENT} component={PaymentScreenContainer} />
    </Stack.Navigator>
  );
}
