import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing } from '../../../../theme';
import SmallButton from '../../../../shared/buttons/SmallButton';
import HomebaseAlert, { useAlertControl } from '../../../../shared/common/HomebaseAlert';
import AddEditCustomerPersonalAddressPresenter from './AddEditCustomerPersonalAddressPresenter';

const AddEditCustomerPersonalAddressContainer = ({ route }) => {
  let { customerPersonalInfo } = route?.params;
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
          text="Cancel"
          onPress={() => {
            close();
          }}
          color={colors.whiteBackground}
          textColor={colors.primaryDarker}
          width={spacing.SCALE_154}
        />
        <SmallButton
          text="Confirm"
          onPress={() => {
            navigation.goBack();
          }}
          textColor={colors.text}
          width={spacing.SCALE_154}
          color={colors.primaryDarker}
        />
      </View>
    );
  };

  const handleBackPress = () => {
    addEditEmployeeAlert.alert('Your changes will be discarded');
  };
  return (
    <>
      <AddEditCustomerPersonalAddressPresenter
        handleBackPress={handleBackPress}
        customerPersonalInfo={customerPersonalInfo}
        customerData={customerData}
      />
      <HomebaseAlert key="info" control={addEditEmployeeAlert} renderButtonRow={renderActionButtons} />
    </>
  );
};

export default AddEditCustomerPersonalAddressContainer;
