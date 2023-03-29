import React from 'react';
import { View } from 'react-native';

import { colors, spacing } from '../../../../theme';
import SmallButton from '../../../../shared/buttons/SmallButton';
import AddEditEmployeeScreenPresenter from './AddEditEmployeeScreenPresenter';
import HomebaseAlert, { useAlertControl } from '../../../../shared/common/HomebaseAlert';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../../../utils/Firebase';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const AddEditEmployeeScreenContainer = ({ route }) => {
  const formHeader = route?.params?.header;
  const employee = route?.params?.employee;
  const addEditEmployeeAlert = useAlertControl();
  const navigation = useNavigation();

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
    if (formHeader === 'Employee details') {
      navigation.goBack();
    }
    addEditEmployeeAlert.alert('You have unsaved changes');
  };

  const handleAddEmployee = async ({ firstName, lastName, email, phoneNumber, password, employeeType, userTags }) => {
    if (formHeader === 'Employee details') {
      navigation.goBack();
    }
    if (!employee) {
      let createUser = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User sign up');
      let businessId = await AsyncStorage.getItem('userData');

      const employeeRef = doc(db, 'users', createUser.user.uid);
      let employeeObject = {
        firstName: firstName,
        lastName: lastName,
        id: createUser.user.uid,
        email: email,
        phone: phoneNumber,
        businessId: businessId,
        createdAt: serverTimestamp(),
        isAdmin: 'true',
        userType: employeeType,
      };

      await setDoc(employeeRef, employeeObject);
      console.log('Employee added');
    } else {
      let businessId = await AsyncStorage.getItem('userData');
      const employeeRef = doc(db, 'users', businessId);

      let employeeObject = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        businessId: employeeRef.id,
        createdAt: serverTimestamp(),
        isAdmin: 'true',
        userType: employeeType,
      };
      let updateObject = {
        ...employeeObject,
        createdAt: employee.createdAt,
        updatedAt: serverTimestamp(),
      };
      const updateEmployeeRef = doc(db, 'users', employee.id);
      await updateDoc(updateEmployeeRef, updateObject);
      console.log('Employee updated');
    }
    navigation.navigate(SCREENS.EMPLOYEES_LIST);
  };
  return (
    <>
      <AddEditEmployeeScreenPresenter
        handleBackPress={handleBackPress}
        formHeader={formHeader}
        handleAddEmployee={handleAddEmployee}
        employee={employee}
      />
      <HomebaseAlert key="info" control={addEditEmployeeAlert} renderButtonRow={renderActionButtons} />
    </>
  );
};

export default AddEditEmployeeScreenContainer;
