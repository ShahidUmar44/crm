import React, { useContext, useState, useCallback } from 'react';
import { doc, serverTimestamp, updateDoc, collection, query, getDocs, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jobDetails } from '../../../../example_docs';
import { UserContext } from '../../../../context/UserContext';
import moment from 'moment';
import { sendMessage } from '../../../../utils/twilio';
import { useFocusEffect } from '@react-navigation/native';

import { db } from '../../../../utils/Firebase';
import JobDetailsPresenter from './JobDetailsPresenter';

const JobDetailsCotainer = ({ route }) => {
  const calendarData = route?.params?.calendarData;
  // const calendarData = jobDetails;
  // console.log('🚀 ~ file: JobDetailsCotainer.js:10 ~ JobDetailsCotainer ~ calendarData:', calendarData);

  const { userData } = useContext(UserContext);

  const handleStartDrivingTime = async () => {
    const businessId = userData.userData.businessId;
    const jobRef = doc(db, 'businesses', businessId, 'jobs', calendarData?.jobId);
    await updateDoc(jobRef, {
      startDrivingTime: serverTimestamp(),
    });
    console.log('Start Driving Time added to firestore');
    //send message to customer
    const message = `Your technician is on their way to your location. They will arrive at ${moment(
      calendarData?.start,
    ).format('h:mm A')}\n\n- ${userData.bizData?.companyName}`;
    const to = calendarData?.customer?.phone?.mobile;
    const from = userData.bizData?.twilioNumber;
    const companyName = userData.bizData?.companyName;
    const customerName = calendarData?.customer?.displayName;
    const notifications = calendarData?.customer?.notifications;

    if (!from) {
      alert(
        'Your business phone number has not been set up to send messages, yet please allow 24 hours for this to be set up.',
      );
    }
    if (to && from && businessId && companyName && customerName && notifications) {
      const response = await sendMessage(message, to, from, businessId, companyName, customerName);
      console.log(response);
    } else {
      console.log('missing data, or you have notifications turned off');
    }
  };
  const handleEndDrivingTime = async () => {
    let businessId = userData.userData.businessId;
    const jobRef = doc(db, 'businesses', businessId, 'jobs', calendarData?.jobId);
    await updateDoc(jobRef, {
      endDrivingTime: serverTimestamp(),
    });
    console.log('End driving time added to firestore');
    //send message to customer
    const message = `Your technician has arrived.\n\n- ${userData.bizData?.companyName}`;
    const to = calendarData?.customer?.phone?.mobile;
    const from = userData.bizData?.twilioNumber;
    const companyName = userData.bizData?.companyName;
    const customerName = calendarData?.customer?.displayName;
    const notifications = calendarData?.customer?.notifications;

    if (!from) {
      alert(
        'Your business phone number has not been set up to send messages, yet please allow 24 hours for this to be set up.',
      );
    }
    if (to && from && businessId && companyName && customerName && notifications) {
      const response = await sendMessage(message, to, from, businessId, companyName, customerName);
      console.log(response);
    } else {
      console.log('missing data, or you have notifications turned off');
    }
  };
  const handleStartTime = async () => {
    let businessId = userData.userData.businessId;
    const jobRef = doc(db, 'businesses', businessId, 'jobs', calendarData?.jobId);
    await updateDoc(jobRef, {
      startedJobTime: serverTimestamp(),
    });
    console.log('Start job time added to firestore');
  };
  const handleEndTime = async () => {
    let businessId = userData.userData.businessId;
    const jobRef = doc(db, 'businesses', businessId, 'jobs', calendarData?.jobId);
    await updateDoc(jobRef, {
      endedJobTime: serverTimestamp(),
    });
    console.log('End job time added to firestore');
    //send message to customer
    const message = `Your work with ${userData.bizData?.companyName} has finished.`;
    const to = calendarData?.customer?.phone?.mobile;
    const from = userData.bizData?.twilioNumber;
    const companyName = userData.bizData?.companyName;
    const customerName = calendarData?.customer?.displayName;
    const notifications = calendarData?.customer?.notifications;

    if (!from) {
      alert(
        'Your business phone number has not been set up to send messages, yet please allow 24 hours for this to be set up.',
      );
    }
    if (to && from && businessId && companyName && customerName && notifications) {
      const response = await sendMessage(message, to, from, businessId, companyName, customerName);
      console.log(response);
    } else {
      console.log('missing data, or you have notifications turned off');
    }
  };

  async function sendReview() {
    let businessId = userData.userData.businessId;
    const jobRef = doc(db, 'businesses', businessId, 'jobs', calendarData?.jobId);
    await updateDoc(jobRef, {
      reviewMessageSent: serverTimestamp(),
    });
    // send message to customer
    const message = `Thanks for business, if you could leave us a review we would greatly appreciate it!${
      userData.bizData.grapevyyn || ''
    }`;
    const to = calendarData?.customer?.phone?.mobile;
    const from = userData.bizData?.twilioNumber;
    const companyName = userData.bizData?.companyName;
    const customerName = calendarData?.customer?.displayName;
    const notifications = calendarData?.customer?.notifications;

    if (!from) {
      alert(
        'Your business phone number has not been set up to send messages, yet please allow 24 hours for this to be set up.',
      );
    }
    if (to && from && businessId && companyName && customerName && notifications) {
      const response = await sendMessage(message, to, from, businessId, companyName, customerName);
      console.log(response);
    } else {
      console.log('missing data, or you have notifications turned off');
    }
  }

  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    let businessId = userData?.userData.businessId;
    let usersRef = collection(db, 'users');
    const allEmployees = query(usersRef, where('businessId', '==', businessId));

    let docSnap = await getDocs(allEmployees);
    const docArray = docSnap.docs.map(doc => doc.data());
    setUsers(docArray);
  };

  useFocusEffect(
    useCallback(() => {
      getAllUsers();

      return () => {
        setUsers([]);
      };
    }, []),
  );

  return (
    <JobDetailsPresenter
      calendarData={calendarData}
      handleEndDrivingTime={handleEndDrivingTime}
      handleStartDrivingTime={handleStartDrivingTime}
      handleStartTime={handleStartTime}
      handleEndTime={handleEndTime}
      sendReview={sendReview}
      users={users}
    />
  );
};

export default JobDetailsCotainer;
