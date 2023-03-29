import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { db } from '../../../../utils/Firebase';

import CustomerDetailsPresenter from './CustomerDetailsPresenter';

const CustomerDetailsContainer = ({ route }) => {
  const { userData } = useContext(UserContext);
  const name = route?.params?.name;
  const item = route?.params?.item;
  const [listJobsData, setListJobsData] = useState([]);
  const [listEstimatesData, setListEstimatesData] = useState([]);
  const [listInvoicesData, setListInvoicesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllJobs = async () => {
    setLoading(true);
    let businessId = userData.userData.businessId;
    const jobsRef = collection(db, 'businesses', businessId, 'jobs');
    let customerJobsRef = query(jobsRef, where('customer.customerId', '==', item?.customerId));
    let docSnap = await getDocs(customerJobsRef);
    let docArray = docSnap.docs.map(doc => doc.data());
    setListJobsData(docArray);
    setLoading(false);
  };
  const getAllEstimates = async () => {
    setLoading(true);
    let businessId = userData.userData.businessId;
    const estimatesRef = collection(db, 'businesses', businessId, 'estimates');
    let customerEstimatesRef = query(estimatesRef, where('customer.customerId', '==', item?.customerId));
    let docSnap = await getDocs(customerEstimatesRef);
    let docArray = docSnap.docs.map(doc => doc.data());
    setListEstimatesData(docArray);
    setLoading(false);
  };
  const getAllInvoices = async () => {
    setLoading(true);
    let businessId = userData.userData.businessId;
    const invoicesRef = collection(db, 'businesses', businessId, 'invoices');
    let customerInvoicesRef = query(invoicesRef, where('customerId', '==', item?.customerId));
    let docSnap = await getDocs(customerInvoicesRef);
    let docArray = docSnap.docs.map(doc => doc.data());
    setListInvoicesData(docArray);
    setLoading(false);
  };

  useEffect(() => {
    getAllJobs();
    getAllEstimates();
    getAllInvoices();
  }, []);

  return (
    <CustomerDetailsPresenter
      name={name}
      item={item}
      listJobsData={listJobsData}
      listEstimatesData={listEstimatesData}
      listInvoicesData={listInvoicesData}
    />
  );
};

export default CustomerDetailsContainer;
