/* eslint-disable import/prefer-default-export */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAwFs9qeJDhiM30N3a8T3lzQrNneGzr_Yw',
  authDomain: process.env.PLANN_MEAL_AUTH_DOMAIN,
  databaseURL: process.env.PLANN_MEAL_DATABASE_URL,
  projectId: process.env.PLANN_MEAL_PROJECT_ID,
  storageBucket: process.env.PLANN_MEAL_STORAGE_BUCKET,
  messagingSenderId: process.env.PLANN_MEAL_MESSAGIING_SENDER_ID,
  appId: process.env.PLANN_MEAL_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
