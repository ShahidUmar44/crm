import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../../context/UserContext';
import { db } from '../../../../utils/Firebase';
import { doc, getDoc } from 'firebase/firestore';

import { SCREENS } from '../../../../constants';
import InvoiceScreenPresenter from './InvoiceScreenPresenter';

const InvoiceScreenContainer = ({ route }) => {
  const jobId = route?.params?.jobId;
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);
  const [jobDetails, setJobDetails] = useState(null);

  // we do this to get a completely updated version of the job details
  useEffect(() => {
    const getJobDetails = async () => {
      const jobSnap = await getDoc(doc(db, 'businesses', userData?.userData?.businessId, 'jobs', jobId));
      setJobDetails(jobSnap.data());
    };
    getJobDetails();
  }, []);

  return <InvoiceScreenPresenter jobDetails={jobDetails} />;
};

export default InvoiceScreenContainer;
