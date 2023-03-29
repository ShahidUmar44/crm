import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBqJDkyWdb21uklLpw3riZEk0DnsQ8JVRk',
  authDomain: 'homebase-90.firebaseapp.com',
  projectId: 'homebase-90',
  storageBucket: 'homebase-90.appspot.com',
  messagingSenderId: '712228217025',
  appId: '1:712228217025:web:0d9ac07f9478380454b440',
  measurementId: 'G-E59TPNGEXQ',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
