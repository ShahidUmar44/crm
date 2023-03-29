import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing } from '../../../../theme';
import SmallButton from '../../../../shared/buttons/SmallButton';
import HomebaseAlert, { useAlertControl } from '../../../../shared/common/HomebaseAlert';
import CustomerCompanyDetatilsPresenter from './CustomerCompanyDetatilsPresenter';

const CustomerCompanyDetatilsContainer = ({ route }) => {
  const { customerAddress } = route?.params;
  let customerData = route?.params?.customerData;

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

  const handleBackPress = () => {
    addEditEmployeeAlert.alert('You have unsaved changes');
  };
  return (
    <>
      <CustomerCompanyDetatilsPresenter
        handleBackPress={handleBackPress}
        customerAddress={customerAddress}
        customerData={customerData}
      />
      <HomebaseAlert key="info" control={addEditEmployeeAlert} renderButtonRow={renderActionButtons} />
    </>
  );
};

export default CustomerCompanyDetatilsContainer;
