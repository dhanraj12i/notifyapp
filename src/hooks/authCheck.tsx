import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const RequiredAuth: React.FC = () => {
  const { loggedIn } = useContext(AuthContext);
  const location = useLocation();

  if (Object.entries(loggedIn || {}).length) {
    return <Outlet />;
  } else {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }
};

export default RequiredAuth;
