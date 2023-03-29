import React, { useRef, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';

import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';
import { UserContext } from '../context/UserContext';
// import { SplashScreen } from '../feature/auth/screens';
import { STRIPE_PUBLIC_KEY_TEST } from '../config/Stripe';

/* ################################################################################
 * App/Root Navigation Settings
 * ############################################################################### */

export default function MainNavigator() {
  const isDarkMode = useColorScheme() === 'dark';
  const { user, userData } = useContext(UserContext);
  const [signInStatusChecked, setSignInStatusChecked] = useState(false);

  // References
  const routeNameRef = useRef();
  const navigationRef = useRef();

  let authenticate = () => {
    setTimeout(() => {
      setSignInStatusChecked(true);
    }, 500);
  };

  useEffect(() => {
    authenticate();
  }, []);

  const doHandleStateChange = async () => {
    // eslint-disable-next-line no-unused-vars
    const previousRouteName = routeNameRef?.current;
    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;
    routeNameRef.current = currentRouteName;
  };

  // if (!signInStatusChecked) {
  //   return <SplashScreen />;
  // }

  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLIC_KEY_TEST}
      stripeAccountId={userData?.bizData?.stripeAccountId || undefined}>
      <NavigationContainer
        ref={navigationRef}
        theme={isDarkMode ? DarkTheme : DefaultTheme}
        onReady={() => {
          routeNameRef.current = navigationRef?.current?.getCurrentRoute().name;
        }}
        onStateChange={doHandleStateChange}>
        {user ? <AppNavigation navigation={navigationRef} /> : <AuthNavigation />}
      </NavigationContainer>
    </StripeProvider>
  );
}
