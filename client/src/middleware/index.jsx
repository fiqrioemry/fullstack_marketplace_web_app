import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useProvider } from "../context/GlobalProvider";

const authPath = new Set(["user", "shop", "cart", "shipment"]);
const nonAuthPath = new Set(["signin", "signup", "reset-password"]);

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const { currentPath, userData } = useProvider();
  const pathSegment = currentPath.split("/")[1];
  const isAuthPath = authPath.has(pathSegment);
  const isNonAuthPath = nonAuthPath.has(pathSegment);

  if (userData && isNonAuthPath) {
    return <Navigate to="/" />;
  }

  if (!userData && isAuthPath) {
    return <Navigate to="/signin" />;
  }

  if (userData && userData.role !== "seller" && pathSegment === "shop") {
    return <Navigate to="/" />;
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthRoute;
