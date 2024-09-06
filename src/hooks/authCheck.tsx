import React, { useContext, useMemo } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import Login from "../componenets/Login";

const RequiredAuth: React.FC = () => {
  const { loggedIn } = useContext(AuthContext);

  const isLoggedIn = useMemo(
    () => Object.entries(loggedIn).length !== 0,
    [loggedIn]
  );

  return isLoggedIn ? <Outlet /> : <Login />;
};

export default RequiredAuth;
