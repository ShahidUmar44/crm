import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { UserContext } from '../../../../context/UserContext';
import { colors, spacing } from '../../../../theme';
import SmallButton from '../../../../shared/buttons/SmallButton';
import AddEditEmployeeScreenPresenter from './AddEditEmployeeScreenPresenter';
import HomebaseAlert, { useAlertControl } from '../../../../shared/common/HomebaseAlert';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../../../utils/Firebase';
import { doc, serverTimestamp, setDoc, updateDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { node } from '../../../../constants';

const AddEditEmployeeScreenContainer = ({ route }) => {
  const { userData } = useContext(UserContext);
  const formHeader = route?.params?.header;
  const employee = route?.params?.employee;
  const addEditEmployeeAlert = useAlertControl();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

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
    if (formHeader === 'Employee details') {
      navigation.goBack();
    }
    addEditEmployeeAlert.alert('Your changes will be discarded');
  };

  const handleAddEmployee = async ({ firstName, lastName, email, phoneNumber, password, employeeType, color }) => {
    if (formHeader === 'Employee details') {
      navigation.goBack();
    }
    setIsLoading(true);
    if (!employee) {
      console.log('This is where we create a new employee');

      let businessId = userData.userData.businessId;

      //console log all the values passed in
      console.log('firstName: ', firstName);
      console.log('lastName: ', lastName);
      console.log('email: ', email);
      console.log('phoneNumber: ', phoneNumber);
      console.log('password', password);
      console.log('employeeType: ', employeeType);
      console.log('color: ', color);

      try {
        const response = await fetch(`${node}/employees/create-employee`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            firstName: firstName.slice(0, 1).toUpperCase() + firstName.slice(1),
            lastName: lastName.slice(0, 1).toUpperCase() + lastName.slice(1),
            phone: phoneNumber,
            userType: employeeType,
            businessId: businessId,
            color: color,
          }),
        });

        const result = await response.json();
        console.log('result: ', result);

        console.log('Employee created with UID:', result.uid);

        // send them a email that has their email and password so they can login -- going to need to fetch node server

        if (!result.uid) {
          alert('Error creating employee');
          return;
        }
        const res = await fetch(`${node}/employees/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName.slice(0, 1).toUpperCase() + firstName.slice(1),
            lastName: lastName.slice(0, 1).toUpperCase() + lastName.slice(1),
            businessName: userData.bizData.companyName,
            phone: phoneNumber,
          }),
        });

        const { message } = await res.json();

        console.log(message);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('This is where we update an employee');
      let employeeId = employee.id;
      const employeeRef = doc(db, 'users', employeeId);

      let updateObject = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        isAdmin: employeeType === 'Admin' ? 'true' : 'false',
        userType: employeeType,
        color: color,
      };

      console.log('updateObject', updateObject);

      await updateDoc(employeeRef, updateObject);
      console.log('Employee updated');
    }
    setIsLoading(false);
    navigation.navigate(SCREENS.EMPLOYEES_LIST);
  };
  return (
    <>
      <AddEditEmployeeScreenPresenter
        handleBackPress={handleBackPress}
        formHeader={formHeader}
        handleAddEmployee={handleAddEmployee}
        employee={employee}
        isLoading={isLoading}
      />
      <HomebaseAlert key="info" control={addEditEmployeeAlert} renderButtonRow={renderActionButtons} />
    </>
  );
};

export default AddEditEmployeeScreenContainer;
