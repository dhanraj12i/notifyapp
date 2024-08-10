import { createContext } from "react";
import { AuthContextType } from "../types/types";

const defaultContextValue: AuthContextType = {
  loggedIn: {},
  setLoggedIn: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export default AuthContext;
