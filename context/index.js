"use client";

import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <GlobalContext.Provider value={{ user }}>{children}</GlobalContext.Provider>
  );
};

export const AuthProvider = () => {
  return useContext(GlobalContext);
};
