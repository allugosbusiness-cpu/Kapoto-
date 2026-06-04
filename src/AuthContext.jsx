import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from "./firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const appUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
          phone: firebaseUser.phoneNumber || "",
          photoURL: firebaseUser.photoURL || "",
          addresses: [],
          loyaltyPoints: 0,
          createdAt: firebaseUser.metadata.creationTime,
        };
        setUser(appUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;
      const appUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
        phone: firebaseUser.phoneNumber || "",
        photoURL: firebaseUser.photoURL || "",
        addresses: [],
        loyaltyPoints: 0,
        createdAt: firebaseUser.metadata.creationTime,
      };
      toast.success(`Welcome back, ${appUser.name}!`);
      return appUser;
    } catch (error) {
      const errorMessages = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/invalid-credential": "Invalid email or password.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/user-disabled": "This account has been disabled.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
      };
      const message = errorMessages[error.code] || "Login failed. Please try again.";
      toast.error(message);
      throw new Error(message);
    }
  };

  const signup = async (email, password, name, phone) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;

      // Update the user's display name
      await updateProfile(firebaseUser, {
        displayName: name,
      });

      const appUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name,
        phone,
        photoURL: "",
        addresses: [],
        loyaltyPoints: 0,
        createdAt: firebaseUser.metadata.creationTime,
      };
      toast.success(`Welcome to Kapoto, ${name}!`);
      return appUser;
    } catch (error) {
      const errorMessages = {
        "auth/email-already-in-use": "An account with this email already exists.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Password should be at least 6 characters.",
        "auth/operation-not-allowed": "Email/Password sign-up is not enabled.",
      };
      const message = errorMessages[error.code] || "Sign up failed. Please try again.";
      toast.error(message);
      throw new Error(message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const appUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
        phone: firebaseUser.phoneNumber || "",
        photoURL: firebaseUser.photoURL || "",
        addresses: [],
        loyaltyPoints: 0,
        createdAt: firebaseUser.metadata.creationTime,
      };
      toast.success(`Welcome, ${appUser.name}!`);
      return appUser;
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Sign-in cancelled. Please try again.");
      } else if (error.code === "auth/popup-blocked") {
        toast.error("Pop-up was blocked. Please allow pop-ups for this site.");
      } else {
        toast.error("Google sign-in failed. Please try again.");
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("You've been logged out");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const updateProfileData = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
    toast.success("Profile updated!");
  };

  const addAddress = (address) => {
    const newAddress = {
      id: Date.now().toString(),
      ...address,
      isDefault: (user?.addresses?.length || 0) === 0,
    };
    const updatedAddresses = [...(user?.addresses || []), newAddress];
    updateProfileData({ addresses: updatedAddresses });
    return newAddress;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        signup,
        signInWithGoogle,
        logout,
        updateProfile: updateProfileData,
        addAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}