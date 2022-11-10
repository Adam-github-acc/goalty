import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext({
  navTitle: '',
  darkTheme: false,
  isAuthenticated: false,
  setNavTitle: () => {},
  setDarkTheme: () => {},
  setIsAuthenticated: () => {},
});

export default GlobalContext;

export function GlobalContextProvider({ children }) {
  const [navTitle, setNavTitle] = useState('Home');
  const [darkTheme, setDarkTheme] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const context = {
    navTitle,
    darkTheme,
    isAuthenticated,
    setNavTitle,
    setDarkTheme,
    setIsAuthenticated
  };

  return (
    <GlobalContext.Provider value={context}>
      { children }
    </GlobalContext.Provider>
  )
}