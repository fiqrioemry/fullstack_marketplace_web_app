/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export const NonAuthRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" />;
  }

  return <Fragment>{children}</Fragment>;
};

export const AuthRoute = ({ children }) => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (location.pathname === "/open-store") {
    if (user.role === "seller") return <Navigate to="/store" />;
  }

  return <Fragment>{children}</Fragment>;
};

export const SellerRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (!user || user.role !== "seller") {
    return <Navigate to="/" />;
  }
  return <Fragment>{children}</Fragment>;
};

export const AdminRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (!user || user.role !== "admin") {
    return <Navigate to="*" />;
  }
  return <Fragment>{children}</Fragment>;
};
