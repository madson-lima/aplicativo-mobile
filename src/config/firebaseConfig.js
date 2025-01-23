import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "#################",
  authDomain: "###########",
  projectId: "############",
  storageBucket: "##############",
  messagingSenderId: "###########",
  appId: "##############",
  measurementId: "##########",
};

// Initialize Firebase app (ensure it's initialized only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export Firebase modules
export { app, auth };
