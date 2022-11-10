import { createContext, useEffect, useState } from "react";
import { api } from "../utils/enums";
import storage from "../utils/storage";
import useApi from './../hooks/useApi';

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
  const {data: companies, error, isLoading, fetchData} = useApi();

  useEffect(() => {
    (async () => setIsAuthenticated(await storage.get('access-token') !== undefined))();
    const url = api.baseUrl + api.v1prefix + api.companyPrefix;

    fetchData(url);
  }, [])

  const context = {
    navTitle,
    darkTheme,
    isAuthenticated,
    companies,
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