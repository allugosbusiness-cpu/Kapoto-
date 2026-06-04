import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

// Firebase configuration - API keys are safe to embed in client-side code
// They are restricted in the Firebase Console by allowed domains
const firebaseConfig = {
  apiKey: "AIzaSyCCwLxiVNCSc3plwSXw5dFMLp5G7sIiIJI",
  authDomain: "kapotorestaurant-1bca2.firebaseapp.com",
  projectId: "kapotorestaurant-1bca2",
  storageBucket: "kapotorestaurant-1bca2.firebasestorage.app",
  messagingSenderId: "786173672495",
  appId: "1:786173672495:web:c000b18d98af42ec8e5ada",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
};

export default app;