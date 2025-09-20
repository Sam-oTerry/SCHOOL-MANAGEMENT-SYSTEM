// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC13_vM3RlSSxCDXTiKafekCBPpejtSGWc",
  authDomain: "ass-sms.firebaseapp.com",
  projectId: "ass-sms",
  storageBucket: "ass-sms.firebasestorage.app",
  messagingSenderId: "515388722489",
  appId: "1:515388722489:web:21169f130303f48aaa2ce8",
  measurementId: "G-2FVKDJWK5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
export { analytics };

export default app;
