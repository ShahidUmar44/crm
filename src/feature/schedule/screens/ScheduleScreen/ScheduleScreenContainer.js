import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../../utils/Firebase';

import ScheduleScreenPresenter from './ScheduleScreenPresenter';

const ScheduleScreenContainer = () => {
  const route = useRoute();
  const createdJob = route?.params?.item;
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const getAllJobs = async () => {
    setLoading(true);
    let businessId = await AsyncStorage.getItem('userData');
    let customerRef = query(collection(db, 'businesses', businessId, 'jobs'));
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
      getAllJobs();
    }, []),
  );

  return <ScheduleScreenPresenter createdJob={createdJob} responseData={responseData} />;
};

export default ScheduleScreenContainer;
