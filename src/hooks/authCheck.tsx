import React, { useContext, useMemo } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import Login from "../componenets/Login";

const RequiredAuth: React.FC = () => {
  const { loggedIn } = useContext(AuthContext);
  // const location = useLocation();
  // const sessionID = useMemo(() => localStorage.getItem("sessionID"), []);

  console.log("Current loggedIn value:", loggedIn);

  // Check if the user is logged in
  const isLoggedIn = useMemo(
    () => Object.entries(loggedIn).length !== 0,
    [loggedIn]
  );

  // if (isLoggedIn) {
  //   if (location.pathname.toLocaleLowerCase() === "/login" && sessionID) {
  //     return <Navigate to="/home" replace />;
  //   } else {
  return isLoggedIn ? <Outlet /> : <Login />;
  //   }
  // } else {
  //   // if (sessionID) {
  //   //   return <Outlet />;
  //   // }
  //   return <Navigate to="/Login" state={{ from: location }} replace />;
  // }
};

export default RequiredAuth;
