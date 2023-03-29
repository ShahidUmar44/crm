import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth } from '../../../../utils/Firebase';
import SignInScreenPresenter from './SignInScreenPresenter';
import { AppContext } from '../../../../context/AppContext';

const SignInScreenContainer = () => {
  const { setIsSignedIn, setbusinessId } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data, setError) => {
    try {
      setIsLoading(true);
      let userCred = await signInWithEmailAndPassword(auth, data.email, data.password);
      setIsLoading(false);
      let token = userCred._tokenResponse.refreshToken;
      setbusinessId(userCred.user.uid);
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', userCred.user.uid);
      const currentTimezone = moment.tz.guess();

      setIsSignedIn(true);
    } catch (error) {
      setError('password', { type: 'custom', message: error?.message || '* User not found' });
      setIsLoading(false);
    }
  };

  return <SignInScreenPresenter isLoading={isLoading} onSignIn={handleSignIn} />;
};

export default SignInScreenContainer;
