import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SCREENS } from '../../../../constants';
import { db } from '../../../../utils/Firebase';
import { colors, spacing } from '../../../../theme';
import CustomerNotePresenter from './CustomerNotePresenter';
import SmallButton from '../../../../shared/buttons/SmallButton';
import HomebaseAlert, { useAlertControl } from '../../../../shared/common/HomebaseAlert';
import { collection, doc, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore';

const CustomerNoteContainer = ({ route }) => {
  const { companyDetails } = route?.params;
  const customerData = route?.params?.customerData;

  const navigation = useNavigation();
  const addEditEmployeeAlert = useAlertControl();

  const renderActionButtons = ({ close }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <SmallButton
          text="Discard changes"
          onPress={() => {
            navigation.goBack();
          }}
          color={colors.whiteBackground}
          textColor={colors.primaryDarker}
          width={spacing.SCALE_154}
        />
        <SmallButton
          text="Continue changes"
          onPress={() => {
            close();
          }}
          textColor={colors.text}
          width={spacing.SCALE_154}
          color={colors.primaryDarker}
        />
      </View>
    );
  };

  const saveCustomer = async data => {
    let businessId = await AsyncStorage.getItem('userData');
    if (customerData) {
      let customerRef = doc(db, 'businesses', businessId, 'customers', customerData.customerId);
      let customerCred = await updateDoc(customerRef, {
        ...data,
        customerId: customerRef.id,
        dateUpdated: Timestamp.now(),
        lastUpdated: serverTimestamp(),
        businessId: businessId,
        displayName: `${data.firstName} ${data.lastName}`,
      });
      navigation.navigate(SCREENS.CUSTOMERS_LIST);
    } else {
      let customerRef = doc(collection(db, 'businesses', businessId, 'customers'));
      let customerCred = await setDoc(customerRef, {
        ...data,
        customerId: customerRef.id,
        dateAdded: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        businessId: businessId,
        displayName: `${data.firstName} ${data.lastName}`,
      });
      navigation.navigate(SCREENS.CUSTOMERS_LIST);
    }
  };

  const handleBackPress = () => {
    addEditEmployeeAlert.alert('You have unsaved changes');
  };
  return (
    <>
      <CustomerNotePresenter
        handleBackPress={handleBackPress}
        saveCustomer={saveCustomer}
        companyDetails={companyDetails}
        customerData={customerData}
      />
      <HomebaseAlert key="info" control={addEditEmployeeAlert} renderButtonRow={renderActionButtons} />
    </>
  );
};

export default CustomerNoteContainer;
