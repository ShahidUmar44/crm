import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../constants';
import CustomerListScreen from './screens/CustomersListScreen';
import AddEditCustomerPersonalInfoContainer from './screens/AddEditCustomerPersonalInfo';
import AddEditCustomerPersonalAddressContainer from './screens/AddEditCustomerPersonalAddress';

import CustomerCompanyDetatilsContainer from './screens/cutomer-company-detais';
import CustomerNoteContainer from './screens/customer-note';
import CustomerDetailsContainer from './screens/customer-details';
import NewJobContainer from '../new-job/screens/Newjob';
import EstimateScreenContainer from '../estimate/screens/Estimate';
import JobDetailsCotainer from '../job-details/screens/JobDetails';

// new screens
import EditCustomerInfoPresenter from './screens/AddEditCustomerPersonalInfo';
import NewCustomerScreenFromJob from './screens/AddEditCustomerPersonalInfo';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function CustomerNavigator() {
  console.log('newcustomerscreenfromjob', SCREENS.NEW_CUSTOMER_SCREEN_FROM_JOB);
  return (
    <Stack.Navigator initialRouteName={SCREENS.CUSTOMERS_LIST} screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.CUSTOMERS_LIST} component={CustomerListScreen} />
      <Stack.Screen name={SCREENS.ADD_EDIT_CUSTOMER_PERSONAL_INFO} component={AddEditCustomerPersonalInfoContainer} />
      <Stack.Screen name={SCREENS.EDIT_CUSTOMER_INFO} component={EditCustomerInfoPresenter} />
      <Stack.Screen name={SCREENS.NEW_CUSTOMER_SCREEN_FROM_JOB} component={NewCustomerScreenFromJob} />

      <Stack.Screen
        name={SCREENS.ADD_EDIT_CUSTOMER_PERSONAL_ADDRESS}
        component={AddEditCustomerPersonalAddressContainer}
      />
      <Stack.Screen name={SCREENS.ADD_EDIT_COMPANY_DETAILS} component={CustomerCompanyDetatilsContainer} />
      <Stack.Screen name={SCREENS.CUSTOMER_NOTE_CONTAINER} component={CustomerNoteContainer} />
      <Stack.Screen name={SCREENS.CUSTOMER_DETAILS} component={CustomerDetailsContainer} />
      <Stack.Screen name={SCREENS.NEWJOB} component={NewJobContainer} />
      <Stack.Screen name={SCREENS.ESTIMATE} component={EstimateScreenContainer} />
      <Stack.Screen name={SCREENS.JOBDETAILS} component={JobDetailsCotainer} />
    </Stack.Navigator>
  );
}
