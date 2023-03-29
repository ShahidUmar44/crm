import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import SmallButton from '../../../../shared/buttons/SmallButton';
import HomebaseAlert, { useAlertControl } from '../../../../shared/common/HomebaseAlert';
import { colors, spacing } from '../../../../theme';
import EditCustomerInfoPresenter from './EditCustomerInfoPresenter';

// import AddEditCustomerPersonalInfoPresenter from './AddEditCustomerPersonalInfoPresenter';

const AddEditCustomerPersonalInfoContainer = ({ route }) => {
  const customerData = route?.params?.employee;

  console.log('customerData', customerData);

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
      <EditCustomerInfoPresenter handlePressGoBack={handleBackPress} customerData={customerData} />
      <HomebaseAlert key="info" control={addEditEmployeeAlert} renderButtonRow={renderActionButtons} />
    </>
  );
};

export default AddEditCustomerPersonalInfoContainer;
