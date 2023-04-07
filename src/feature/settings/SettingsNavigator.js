import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../constants';

import SettingsScreen from './screens/SettingsScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import EmployeeListScreenContainer from '../employee/screens/EmployeeListScreen';
import AddEditEmployeeScreenContainer from '../employee/screens/AddEditEmployee';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator initialRouteName={SCREENS.SETTINGSSCREEN} screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.SETTINGSSCREEN} component={SettingsScreen} />
      <Stack.Screen name={SCREENS.USERPROFILESCREEN} component={UserProfileScreen} />
      <Stack.Screen name={SCREENS.EMPLOYEES_LIST} component={EmployeeListScreenContainer} />
      <Stack.Screen name={SCREENS.ADD_EDIT_EMPLOYEE} component={AddEditEmployeeScreenContainer} />
    </Stack.Navigator>
  );
}
