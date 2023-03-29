import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { SCREENS } from '../../constants';
import EmployeeListScreen from './screens/EmployeeListScreen';
import AddEditEmployeeScreen from './screens/AddEditEmployee';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function EmployeeNavigator() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (navigation.isFocused()) {
      navigation.navigate(SCREENS.EMPLOYEES_LIST);
    }
  }, [isFocused]);
  return (
    <Stack.Navigator initialRouteName={SCREENS.EMPLOYEES_LIST} screenOptions={screenOptions}>
      <Stack.Screen name={SCREENS.EMPLOYEES_LIST} component={EmployeeListScreen} />
      <Stack.Screen name={SCREENS.ADD_EDIT_EMPLOYEE} component={AddEditEmployeeScreen} />
    </Stack.Navigator>
  );
}
