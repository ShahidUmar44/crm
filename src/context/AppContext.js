import React, { createContext, useState, useMemo, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../utils/Firebase';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userBussinessId, setUserBussinessId] = useState('');
  const [businessId, setbusinessId] = useState('');
  const [userData, setUserData] = useState('');
  const [online, setOnline] = useState(false);
  const [referral, setReferral] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const memoizedValue = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
      userBussinessId,
      setUserBussinessId,
      businessId,
      setbusinessId,
      userData,
      setUserData,
      online,
      setOnline,
      referral,
      setReferral,
      start,
      setStart,
      end,
      setEnd,
    }),
    [
      isSignedIn,
      setIsSignedIn,
      userBussinessId,
      setUserBussinessId,
      businessId,
      setbusinessId,
      userData,
      setUserData,
      online,
      setOnline,
      referral,
      setReferral,
      start,
      setStart,
      end,
      setEnd,
    ],
  );

  return <AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>;
};
