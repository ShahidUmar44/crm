import { collection, doc, getDocs, query, setDoc, serverTimestamp, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { db } from '../../../../utils/Firebase';
import { SCREENS } from '../../../../constants';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { node } from '../../../../constants/index';

import EstimateListScreenPresenter from './EstimateListScreenPresenter';

const EstimateScreenContainer = () => {
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);

  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [estimateLoading, setEstimateLoading] = useState(false);
  const [estimateSent, setEstimateSent] = useState(false);

  const getAllCustomers = async () => {
    let businessId = userData?.userData.businessId;
    setLoading(true);
    let customersRef = collection(db, 'businesses', businessId, 'customers');
    let docSnap = await getDocs(customersRef);
    const docArray = docSnap.docs.map(doc => doc.data());
    setCustomers(docArray);
    setLoading(false);
  };
  const getAllUsers = async () => {
    setLoading(true);
    let businessId = userData?.userData.businessId;
    let usersRef = collection(db, 'users');
    const allEmployees = query(usersRef, where('businessId', '==', businessId));

    let docSnap = await getDocs(allEmployees);
    const docArray = docSnap.docs.map(doc => doc.data());
    setUsers(docArray);
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllCustomers();
      getAllUsers();

      return () => {
        setCustomers([]);
        setUsers([]);
      };
    }, []),
  );

  const handleCreateAndSendEstimate = async ({
    customer,
    dateAdded,
    leadSource,
    lineItems,
    estimateTotal,
    note = '',
  }) => {
    if (!customer || !dateAdded || !lineItems || !estimateTotal) {
      return;
    }
    setEstimateLoading(true);
    let businessId = userData?.userData.businessId;

    const newEstimateRef = doc(collection(db, 'businesses', businessId, 'estimates'));
    const newEstimateData = {
      estimateId: newEstimateRef.id,
      businessId,
      customer,
      dateAdded,
      lastUpdated: serverTimestamp(),
      leadSource,
      lineItems,
      estimateTotal,
      note,
      timezone: userData.bizData.timezone,
    };
    console.log('newEstimateData', newEstimateData);
    await setDoc(newEstimateRef, newEstimateData);

    const response = await fetch(`${node}/estimate/estimate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        estimate: newEstimateData,
        businessName: userData.bizData.companyName,
        businessEmail: userData.bizData.email,
        businessPhone: userData.bizData.phone,
        businessAddress: userData.bizData.address,
      }),
    });

    const { message } = await response.json();
    console.log('response from email api', message);

    if (message === 'Email sent') {
      setEstimateSent(true);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } else {
      alert('There was an error sending the email');
    }
    setEstimateLoading(false);
  };

  // const addNewEstimate = async ({ customer, dateAdded, lineItem, jobTotal, jobTags }) => {
  //   let businessId = await AsyncStorage.getItem('userData');

  //   const newJobRef = doc(collection(db, 'businesses', businessId, 'estimates'));
  //   const newJobData = {
  //     estimateId: newJobRef.id,
  //     customer,
  //     dateAdded,
  //     end,
  //     start,
  //     lineItem,
  //     jobTotal,
  //     jobTags,
  //   };
  //   await setDoc(newJobRef, newJobData);
  //   console.log('Estimate added');
  //   // let item = { customer, dateAdded, dispatchTo, leadSource, lineItem, jobTotal, jobTags };
  //   // navigation.navigate(SCREENS.CUSTOMER_DETAILS, { name: 'Estimate' });
  // };
  return (
    <EstimateListScreenPresenter
      customers={customers}
      users={users}
      addNewEstimate={handleCreateAndSendEstimate}
      estimateLoading={estimateLoading}
      estimateSent={estimateSent}
    />
  );
};

export default EstimateScreenContainer;
