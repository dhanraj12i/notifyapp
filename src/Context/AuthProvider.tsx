import { useState, FC, useEffect, useRef } from "react";
import { AuthProviderProps } from "../types/types";
import { Models } from "appwrite";
import AuthContext from "./AuthContext";
import { getSession } from "../graphQL/appServices";
import { enqueueSnackbar } from "notistack";
import { notifyInfo } from "../componenets/shared/constants";

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<Models.Preferences>({});
  const sessionID = localStorage.getItem("sessionID");
  const effectRan = useRef(false);

  const checkSession = async () => {
    if (sessionID && Object.entries(loggedIn).length === 0) {
      try {
        const session = await getSession(sessionID!);
        {
          Object.entries(session).length !== 0 &&
            enqueueSnackbar("Session Retrived", {
              variant: notifyInfo.success as "success",
            });
        }
        setLoggedIn(session);
      } catch (error) {
        console.error("Session fetch error:", error);
        setLoggedIn({});
      }
    }
  };

  useEffect(() => {
    if (sessionID && Object.entries(loggedIn).length === 0) {
      effectRan.current = false;
    }

    if (effectRan.current === false) {
      checkSession();
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
