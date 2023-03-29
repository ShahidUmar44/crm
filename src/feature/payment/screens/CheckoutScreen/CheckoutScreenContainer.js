import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { SCREENS } from '../../../../constants';
import CheckoutScreenPresenter from './CheckoutScreenPresenter';

const CheckoutScreenContanier = ({ route }) => {
  const totalAmount = route?.params?.totalAmount ? route?.params?.totalAmount : 499;
  const jobId = route?.params?.jobId;

  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate(SCREENS.PAYMENT, { totalAmount, jobId });
  };

  return <CheckoutScreenPresenter onNext={handleNext} totalAmount={totalAmount} />;
};

export default CheckoutScreenContanier;
