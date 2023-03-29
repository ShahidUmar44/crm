import React from 'react';
import { useNavigation } from '@react-navigation/native';

import AddInvoiceScreenPresenter from './AddInvoiceScreenPresenter';

const AddInvoiceScreenContainer = ({ route }) => {
  const totalAmount = route?.params?.totalAmount;
  console.log('🚀 ~ file: AddInvoiceScreenContainer.js:8 ~ AddInvoiceScreenContainer ~ totalAmount:', totalAmount);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return <AddInvoiceScreenPresenter onBack={handleBack} totalAmount={totalAmount} />;
};

export default AddInvoiceScreenContainer;
