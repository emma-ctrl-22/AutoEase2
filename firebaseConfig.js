// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy5CESSX2lL5RWcB4m1gALso0Un-X0b6c",
  authDomain: "autoease-7b15b.firebaseapp.com",
  projectId: "autoease-7b15b",
  storageBucket: "autoease-7b15b.appspot.com",
  messagingSenderId: "387729360481",
  appId: "1:387729360481:web:87a14162e6a99a19decc20",
  measurementId: "G-HQ20HNKCNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
