// RequiredAuth.tsx
import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
interface RequiredAuthProps {}

const RequiredAuth: React.FC<RequiredAuthProps> = () => {
  // const { loggedIn } = useAuth();
  // const location = useLocation();
  // return Object.entries(loggedIn)?.length ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/Login" state={{ from: location }} replace />
  // );
  return <></>;
};

export default RequiredAuth;
