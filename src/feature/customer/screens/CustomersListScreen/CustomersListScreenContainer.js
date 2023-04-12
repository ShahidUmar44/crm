import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../../context/UserContext';

import { SCREENS } from '../../../../constants';
import { colors, spacing } from '../../../../theme';
import SmallButton from '../../../../shared/buttons/SmallButton';
import CustomersListScreenPresenter from './CustomersListScreenPresenter';
import HomebaseAlert, { useAlertControl } from '../../../../shared/common/HomebaseAlert';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../../../../utils/Firebase';

const CustomersListScreenContainer = () => {
  const { userData } = useContext(UserContext);
  const navigation = useNavigation();
  const deleteEmployeeAlert = useAlertControl();
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState('');

  const handleDeleteCustomer = async close => {
    let businessId = userData?.userData.businessId;
    const customerRef = doc(db, 'businesses', businessId, 'customers', customerId);
    await deleteDoc(customerRef);
    getAllCustomers();
    close();
  };
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
          onPress={() => handleDeleteCustomer(close)}
          textColor={colors.text}
          width={spacing.SCALE_154}
          color={colors.primaryDarker}
        />
      </View>
    );
  };

  /*
   ** get-all-customers
   */
  const getAllCustomers = async () => {
    setLoading(true);
    let businessId = userData?.userData.businessId;
    let customerRef = query(collection(db, 'businesses', businessId, 'customers'));
    let docSnap = await getDocs(customerRef);
    let docArray = docSnap.docs.map(doc => doc.data());
    setResponseData(docArray);
    setLoading(false);
  };

  const handleEditUser = item => {
    navigation.navigate(SCREENS.EDIT_CUSTOMER_INFO, {
      employee: item,
    });
  };

  const handleAddUser = () => {
    navigation.navigate(SCREENS.ADD_EDIT_CUSTOMER_PERSONAL_INFO);
  };

  const handleDeleteUser = item => {
    setCustomerId(item.customerId);
    deleteEmployeeAlert.alert('Are you sure you want to delete this user?');
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllCustomers();
    }, []),
  );
  return (
    <>
      <CustomersListScreenPresenter
        data={responseData}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onAddUser={handleAddUser}
        getAllCustomers={getAllCustomers}
        loading={loading}
      />
      <HomebaseAlert key="info" control={deleteEmployeeAlert} renderButtonRow={renderActionButtons} />
    </>
  );
};

export default CustomersListScreenContainer;
