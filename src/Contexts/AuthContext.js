import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(
    auth.currentUser === null ? true : false
  );

  // Register Function
  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login Function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout Function
  function logout() {
    return signOut(auth);
  }

  // Verify Email Function
  function verifyEmail() {
    console.log("Verification sent to:", currentUser.email);
    return sendEmailVerification(currentUser);
  }

  // Should only run once, so putting in useEffect (onMount only)
  useEffect(() => {
    // Unsubscribe from listener when unMount
    // Set loading to false when checked that there is a user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // User is signed-in
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        // User is signed-out
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
    verifyEmail,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
