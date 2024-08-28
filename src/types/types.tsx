import { Models } from "appwrite";
import { ReactNode } from "react";

export interface AuthContextType {
  loggedIn: Models.Preferences;
  setLoggedIn: React.Dispatch<React.SetStateAction<Models.Preferences>>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface CreateUser {
  name?: string;
  password: string;
  email: string;
}
