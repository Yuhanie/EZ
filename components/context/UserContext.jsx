import React, { useState, useEffect } from "react";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "@/settings/firebaseConfig";

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const user = useFirebaseAuth();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function useFirebaseAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
  const auth = getAuth();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setCurrentUser(null);
        return;
      }
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, [auth]);
  return currentUser;
}
