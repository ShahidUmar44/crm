import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { db } from '../../../../utils/Firebase';

import ScheduleScreenPresenter from './ScheduleScreenPresenter';

const ScheduleScreenContainer = () => {
  const { userData } = useContext(UserContext);
  const route = useRoute();
  const createdJob = route?.params?.item;
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const getAllJobs = async () => {
    console.log('inititializing jobs');
    setLoading(true);
    let businessId = userData?.userData.businessId;
    let jobsRef = collection(db, 'businesses', businessId, 'jobs');
    let docSnap = await getDocs(jobsRef);
    let docArray = docSnap.docs.map(doc => doc.data());
    setResponseData(docArray);
    // console.log('jobs', docArray);
    setLoading(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      getAllJobs();
    }, []),
  );

  return <ScheduleScreenPresenter createdJob={createdJob} responseData={responseData} loading={loading} />;
};

export default ScheduleScreenContainer;
