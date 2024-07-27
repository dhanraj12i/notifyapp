import React, { createContext, useState, FC } from "react";
import { AuthProviderProps } from "../types/types";
import { Models } from "appwrite";
import AuthContext from "./AuthContext";

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<Models.Preferences>({});

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
