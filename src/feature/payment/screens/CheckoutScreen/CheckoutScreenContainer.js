import React, { useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../../context/UserContext';
import { db } from '../../../../utils/Firebase';
import { doc, getDoc } from 'firebase/firestore';

import { SCREENS } from '../../../../constants';
import CheckoutScreenPresenter from './CheckoutScreenPresenter';

const CheckoutScreenContanier = ({ route }) => {
  const jobId = route?.params?.jobId;
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);
  const [jobDetails, setJobDetails] = useState({});

  useEffect(() => {
    const getJobData = async () => {
      const jobRef = doc(db, 'businesses', userData?.userData?.businessId, 'jobs', jobId);
      const jobSnap = await getDoc(jobRef);
      setJobDetails(jobSnap.data());
    };
    getJobData();
  }, []);

  const handleNext = () => {
    navigation.navigate(SCREENS.PAYMENT, { jobDetails });
  };

  const handleOther = () => {
    navigation.navigate('OtherPayment', { jobDetails });
  };

  return <CheckoutScreenPresenter onNext={handleNext} totalAmount={jobDetails?.jobTotal} onOther={handleOther} />;
};

export default CheckoutScreenContanier;
