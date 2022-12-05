import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
// Firebase auth instance
import firebaseAuth from "lib/firebase";
// Google oauth provider
const provider = new GoogleAuthProvider();
// Contexts
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // States to check auth status
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Listener updates auth status when detects change
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setIsSignedIn(true);
        setUser(user);
      } else {
        setIsSignedIn(false);
        setUser(null);
      }
    });
  }, []);
  // Functions handling auth
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      return;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  };
  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  };
  const signOut = async () => {
    try {
      await firebaseSignOut(firebaseAuth);
    } catch (err) {
      console.log(err.message);
    }
  };
  const googleSignIn = async () => {
    try {
      await signInWithPopup(firebaseAuth, provider);
    } catch (err) {
      console.log(err.message);
    }
  };
  // Context provider
  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
        signIn,
        signUp,
        signOut,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useFirebaseAuth = () => useContext(AuthContext);
