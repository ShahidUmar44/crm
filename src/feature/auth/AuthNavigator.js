import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../constants';
import {
  WalkthroughScreen,
  WelcomeScreen,
  SignInScreen,
  SignUpScreen,
  ForgetPasswordScreen,
  NewPasswordScreen,
} from './screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenOptions = {
  showTabs: true,
  headerShown: false,
  gestureEnabled: true,
  headerBackTitleVisible: false,
};

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const [isFirstTime, setIsFirstTime] = useState(false);

  let checkFirstTime = async () => {
    let firstTime = await AsyncStorage.getItem('firstTime');
    return firstTime ? true : false;
  };

  useEffect(() => {
    async function fetchData() {
      const firstTime = await checkFirstTime();
      setIsFirstTime(firstTime);
    }
    fetchData();
  }, []);
  return (
    <Stack.Navigator initialRouteName={SCREENS.WALK_THROUGH} screenOptions={screenOptions}>
      {isFirstTime && (
        <>
          <Stack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} />
          <Stack.Screen name={SCREENS.WALK_THROUGH} component={WalkthroughScreen} />
        </>
      )}
      <Stack.Screen name={SCREENS.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={SCREENS.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={SCREENS.FORGET_PASSWORD} component={ForgetPasswordScreen} />
      <Stack.Screen name={SCREENS.SET_NEW_PASSWORD} component={NewPasswordScreen} />
    </Stack.Navigator>
  );
}
