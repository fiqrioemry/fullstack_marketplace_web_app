/* eslint-disable react/prop-types */
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { createContext, useContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <GlobalContext.Provider value={{ currentPath }}>
      <Toaster />
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProvider = () => useContext(GlobalContext);
