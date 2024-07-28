import React, { createContext, useState, FC, useContext } from "react";
import { AuthContextType, AuthProviderProps } from "../types/types";
import { Models } from "appwrite";

const defaultContextValue: AuthContextType = {
  loggedIn: {},
  setLoggedIn: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export default AuthContext;
