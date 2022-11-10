import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext({
  navTitle: '',
  darkTheme: false,
  setNavTitle: () => {},
  setDarkTheme: () => {}
});

export default GlobalContext;

export function GlobalContextProvider({ children }) {
  const [navTitle, setNavTitle] = useState('Home');
  const [darkTheme, setDarkTheme] = useState(false);

  const context = {
    navTitle,
    darkTheme,
    setNavTitle,
    setDarkTheme
  };

  return (
    <GlobalContext.Provider value={context}>
      { children }
    </GlobalContext.Provider>
  )
}