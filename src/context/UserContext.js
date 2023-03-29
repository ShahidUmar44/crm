import React, { createContext, useState, useMemo, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth, db } from '../utils/Firebase';
import { getDoc, doc } from 'firebase/firestore';
import { SplashScreen } from '../feature/auth/screens';
import HomebaseErrorScreen from '../shared/common/HomebaseErrorScreen';

export const UserContext = createContext({});

const useAuthState = firebaseAuth => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      user => {
        setUser(user);
        setLoading(false);
      },
      error => {
        setError(error);
        setLoading(false);
      },
    );

    // Clean up the listener on unmount
    return () => {
      unsubscribe();
    };
  }, [firebaseAuth]);

  return [user, loading, error];
};

export const UserContextProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [rerun, setRerun] = useState(false);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [noUser, setNoUser] = useState(false);

  useEffect(() => {
    if (!user && !loading && !userData) {
      console.log('no user and no data and no loading so set noUser true in firestore.(UserContext)');
      setNoUser(true);
    }
    if (!user) return;
    setNoUser(false);

    const docRef = doc(db, 'users', user.uid);

    const getUserData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const bizDocRef = doc(db, 'businesses', docSnap.data().businessId);
          const bizDocSnap = await getDoc(bizDocRef);
          if (bizDocSnap.exists()) {
            setUserData({
              userData: docSnap.data(),
              bizData: bizDocSnap.data(),
            });
            setUserDataLoading(false);
            console.log('user and biz doc retrieved from firestore.(UserContext)');
          }
        } else {
          console.log('User is logged in but no data in firestore.(UserContext)');
        }
      } catch (error) {
        console.log('Error getting user document (UserContext)', error);
      }
    };
    getUserData();
  }, [user, rerun, loading]);

  const memoizedContextValue = useMemo(() => {
    return {
      user,
      userData,
      userDataLoading,
      setRerun,
    };
  }, [user, userData, userDataLoading, setRerun]);

  if (loading || (userDataLoading && !noUser)) {
    return <SplashScreen />;
  }
  if (error) {
    return <HomebaseErrorScreen message={error.message} />;
  }

  return <UserContext.Provider value={memoizedContextValue}>{children}</UserContext.Provider>;
};
