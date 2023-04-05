import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../../context/UserContext';

import { SCREENS } from '../../../../constants';
import { colors, spacing } from '../../../../theme';
import SmallButton from '../../../../shared/buttons/SmallButton';
import EmployeeListScreenPresenter from './EmployeeListScreenPresenter';
import HomebaseAlert, { useAlertControl } from '../../../../shared/common/HomebaseAlert';
import { db } from '../../../../utils/Firebase';
import { collection, deleteDoc, doc, getDocs, limit, query, where } from 'firebase/firestore';
import { async } from '@firebase/util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { node } from '../../../../constants';

const data = [
  { id: '001', name: 'John Doe', email: 'johndoe@example.com' },
  { id: '002', name: 'Jane Smith', email: 'janesmith@example.com' },
  { id: '003', name: 'Bob Johnson', email: 'bobjohnson@example.com' },
  { id: '004', name: 'Samantha Lee', email: 'samanthalee@example.com' },
  { id: '005', name: 'David Kim', email: 'davidkim@example.com' },
  { id: '006', name: 'Emily Davis', email: 'emilydavis@example.com' },
  { id: '007', name: 'Kevin Brown', email: 'kevinbrown@example.com' },
  { id: '008', name: 'Amy Chen', email: 'amychen@example.com' },
  { id: '009', name: 'Mike Wilson', email: 'mikewilson@example.com' },
  { id: '010', name: 'Lisa Smith', email: 'lisasmith@example.com' },
  { id: '011', name: 'Tom Jones', email: 'tomjones@example.com' },
  { id: '012', name: 'Sarah Lee', email: 'sarahlee@example.com' },
  { id: '013', name: 'Andrew Kim', email: 'andrewkim@example.com' },
  { id: '014', name: 'Nancy Brown', email: 'nancybrown@example.com' },
  { id: '015', name: 'Chris Lee', email: 'chrislee@example.com' },
  { id: '016', name: 'Eric Johnson', email: 'ericjohnson@example.com' },
  { id: '017', name: 'Jessica Chen', email: 'jessicachen@example.com' },
  { id: '018', name: 'Tim Davis', email: 'timdavis@example.com' },
  { id: '019', name: 'Grace Kim', email: 'gracekim@example.com' },
  { id: '020', name: 'Alex Wilson', email: 'alexwilson@example.com' },
];

const EmployeeListScreenContainer = () => {
  const { userData } = useContext(UserContext);
  const navigation = useNavigation();
  const deleteEmployeeAlert = useAlertControl();
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeId, setEmployeeId] = useState('');

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
            handleDeleteEmployee(close);
          }}
          textColor={colors.text}
          width={spacing.SCALE_154}
          color={colors.primaryDarker}
        />
      </View>
    );
  };
  const getAllEmployees = async () => {
    let businessId = userData.userData.businessId;
    setLoading(true);
    let employeeRef = collection(db, 'users');
    const employeeQuery = query(employeeRef, where('businessId', '==', businessId), limit(50));
    let docSnap = await getDocs(employeeQuery);
    let docArray = docSnap.docs.map(doc => doc.data());
    setEmployeeData(docArray);
    setLoading(false);
  };

  console.log('employee data from container', employeeData);

  const handleDeleteEmployee = async close => {
    if (userData.userData.isAdmin == true) {
      console.log('Employee', employeeId);
      const response = await fetch(`${node}/employeedelete/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: employeeId }),
      });

      const result = await response.json();
      console.log(result);
      if (result.success === true) {
        alert('Employee deleted successfully');
      } else {
        alert('Error deleting employee');
      }
      getAllEmployees();
      close();
    } else {
      alert('You are not authorized to delete employees');
    }
  };

  const handleEditUser = item => {
    if (userData.userData.isAdmin == true) {
      navigation.navigate(SCREENS.ADD_EDIT_EMPLOYEE, {
        employee: item,
        header: 'Edit Employee',
      });
    } else {
      console.log('not authorized');
    }
  };

  const handleAddUser = () => {
    if (userData.userData.isAdmin == true) {
      navigation.navigate(SCREENS.ADD_EDIT_EMPLOYEE);
    } else {
      alert('You are not authorized to add employees');
    }
  };

  const handleDeleteUser = item => {
    if (userData.userData.isAdmin == true) {
      setEmployeeId(item.id);
      deleteEmployeeAlert.alert('Are you sure you want to delete this user?');
    } else {
      alert('You are not authorized to delete employees');
    }
  };

  return (
    <>
      <EmployeeListScreenPresenter
        data={data}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onAddUser={handleAddUser}
        employeeData={employeeData}
        loading={loading}
        getAllEmployees={getAllEmployees}
      />
      <HomebaseAlert key="info" control={deleteEmployeeAlert} renderButtonRow={renderActionButtons} />
    </>
  );
};

export default EmployeeListScreenContainer;
