import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, getDocs, limit, query, serverTimestamp, setDoc, where, updateDoc } from 'firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../../../../context/UserContext';

import { SCREENS } from '../../../../constants';
import { db } from '../../../../utils/Firebase';
import NewJobPresenter from './NewJobPresenter';

const NewJobContainer = () => {
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);

  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const addNewJob = async ({
    customer,
    dateAdded,
    dispatchedTo,
    leadSource,
    lineItems,
    jobTotal,
    note,
    end,
    start,
  }) => {
    let businessId = userData?.userData.businessId;

    const newJobRef = doc(collection(db, 'businesses', businessId, 'jobs'));
    const newJobData = {
      jobId: newJobRef.id,
      businessId,
      customer,
      dateAdded,
      lastUpdated: serverTimestamp(),
      dispatchedTo,
      leadSource,
      end,
      start,
      lineItems,
      jobTotal,
      note,
      timezone: userData.bizData.timezone,
    };
    console.log('newJobData', newJobData);
    await setDoc(newJobRef, newJobData);
    const customerRef = doc(db, 'businesses', userData.userData.businessId, 'customers', customer.customerId);
    await updateDoc(customerRef, {
      lastJob: serverTimestamp(),
    });

    console.log('should have been updated both job and customer doc');
    // let item = { customer, dateAdded, dispatchedTo, leadSource, lineItems, jobTotal, note, start, end };
    // navigation.navigate(SCREENS.SCHEDULE, {
    //   screen: SCREENS.SCHEDULESCREEN,
    //   params: { item },
    // });
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

  return <NewJobPresenter customers={customers} addNewJob={addNewJob} users={users} />;
};

export default NewJobContainer;
