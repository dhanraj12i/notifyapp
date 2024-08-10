import React, { createContext, useState, FC, useEffect, useRef } from "react";
import { AuthProviderProps } from "../types/types";
import { Models } from "appwrite";
import AuthContext from "./AuthContext";
import { account } from "../lib/appwrite";

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<Models.Preferences>({});
  const sessionID = localStorage.getItem("sessionID");
  const effectRan = useRef(false);

  const checkSession = async () => {
    if (sessionID && Object.entries(loggedIn).length === 0) {
      console.log("session", sessionID);
      try {
        const session = await account.getSession(sessionID!);
        console.log("session", session);
        setLoggedIn(session);
      } catch (error) {
        console.error("Session fetch error:", error);
        setLoggedIn({}); // Clear the state if session is invalid
      }
    }
  };

  useEffect(() => {
    if (sessionID && Object.entries(loggedIn).length === 0) {
      console.log("logged in empty");
      effectRan.current = false;
    }

    if (effectRan.current === false) {
      checkSession();
      console.log("logged in");
    }

    return () => {
      effectRan.current = true;
    };
  }, [loggedIn, sessionID]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
