import React from 'react';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { SCREENS } from '../../../../constants';
import { auth, db } from '../../../../utils/Firebase';
import SignUpScreenPresenter from './SignUpScreenPresenter';
import HomebaseAlert, { useAlertControl } from '../../../../shared/common/HomebaseAlert';

const SignInScreenContainer = () => {
  const navigation = useNavigation();
  const signupAlert = useAlertControl();

  const signUp = async data => {
    console.log('DAAta==========', data.email, data.password);
    try {
      let createUser = await createUserWithEmailAndPassword(auth, data.email, data.password);

      const businessRef = doc(db, 'businesses', createUser.user.uid);
      await setDoc(businessRef, {
        id: createUser.user.uid,
        email: createUser.user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phoneNumber,
        companyName: data.companyName,
        companyPhone: data.companyPhone,
        companyWebsite: data.website,
        address: `${data.address},${data.postalCode}`,
        industry: data.industry,
        companySize: data.companySize,
        createdAt: Timestamp.now(),
      });

      const userRef = doc(db, 'users', createUser.user.uid);
      await setDoc(userRef, {
        id: createUser.user.uid,
        email: createUser.user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phoneNumber,
        userType: 'Admin',
        isAdmin: true,
        businessId: createUser.user.uid,
        createdAt: Timestamp.now(),
      });
      navigation.navigate(SCREENS.SIGN_IN);
    } catch (error) {
      signupAlert.alert('Error', error?.message || 'error');
    }
  };

  return (
    <>
      <SignUpScreenPresenter signUp={signUp} />
      <HomebaseAlert key="error" control={signupAlert} />
    </>
  );
};

export default SignInScreenContainer;
