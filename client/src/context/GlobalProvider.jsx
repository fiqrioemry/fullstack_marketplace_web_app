/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { createContext, useContext } from "react";
import { useAuthStore } from "../store/useAuthStore";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isCheckAuth, userData, userAuthCheck } = useAuthStore();

  useEffect(() => {
    userAuthCheck();
  }, [userAuthCheck]);

  return (
    <GlobalContext.Provider
      value={{
        currentPath,
        userData,
      }}
    >
      <Toaster />
      {isCheckAuth ? null : children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProvider = () => useContext(GlobalContext);
