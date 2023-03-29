import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../context/AppContext';
import { db } from '../../../../utils/Firebase';

import EstimateListScreenPresenter from './EstimateListScreenPresenter';

const EstimateScreenContainer = () => {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { start, end } = useContext(AppContext);

  const getAllCustomers = async () => {
    let businessId = await AsyncStorage.getItem('userData');
    setLoading(true);
    let customerRef = query(collection(db, 'businesses', businessId, 'customers'));
    let docSnap = await getDocs(customerRef);
    let docArray = [];
    docSnap.forEach(doc => {
      let singleDoc = doc.data();
      docArray.push(singleDoc);
    });
    setResponseData(docArray);
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllCustomers();

      return () => {
        setResponseData([]);
      };
    }, []),
  );

  const addNewEstimate = async ({ customer, dateAdded, lineItem, jobTotal, jobTags }) => {
    let businessId = await AsyncStorage.getItem('userData');

    const newJobRef = doc(collection(db, 'businesses', businessId, 'estimates'));
    const newJobData = {
      estimateId: newJobRef.id,
      customer,
      dateAdded,
      end,
      start,
      lineItem,
      jobTotal,
      jobTags,
    };
    await setDoc(newJobRef, newJobData);
    console.log('Estimate added');
    // let item = { customer, dateAdded, dispatchTo, leadSource, lineItem, jobTotal, jobTags };
    // navigation.navigate(SCREENS.CUSTOMER_DETAILS, { name: 'Estimate' });
  };
  return <EstimateListScreenPresenter responseData={responseData} addNewEstimate={addNewEstimate} />;
};

export default EstimateScreenContainer;
