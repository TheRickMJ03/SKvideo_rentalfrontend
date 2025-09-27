// NavContext.js
import React, { createContext, useState, useContext } from 'react';

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('Home');
  return (
    <NavContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => useContext(NavContext);
