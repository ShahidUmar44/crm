import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { SCREENS } from '../../../../constants';
import InvoiceScreenPresenter from './InvoiceScreenPresenter';

const InvoiceScreenContainer = ({ route }) => {
  const lineItem = route?.params?.lineItem;
  const clientName = route?.params?.clientName;
  const navigation = useNavigation();
  console.log('DATA=====', lineItem, clientName);

  const handleAddInvoice = () => {
    navigation.navigate(SCREENS.ADD_INVOICE);
  };

  const handleBack = () => {
    navigation.navigate(SCREENS.HOME);
  };

  return (
    <InvoiceScreenPresenter
      onBack={handleBack}
      clientName={clientName}
      onAddInvoice={handleAddInvoice}
      lineItem={lineItem}
    />
  );
};

export default InvoiceScreenContainer;
