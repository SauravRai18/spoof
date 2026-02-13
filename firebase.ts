import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Note: These are example credentials. Ensure these match your actual project in the Firebase Console.
const firebaseConfig = {
  apiKey: "AIzaSyAs-ExampleKey1234567890QwErTyUiOpAs",
  authDomain: "buildlikeengineer-app.firebaseapp.com",
  projectId: "buildlikeengineer-app",
  storageBucket: "buildlikeengineer-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);