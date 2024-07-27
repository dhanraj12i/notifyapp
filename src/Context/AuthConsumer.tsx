import React, { useContext } from "react";
import AuthContext from "./AuthContext";

const AuthConsumer = () => {
  return useContext(AuthContext);
};

export default AuthConsumer;
