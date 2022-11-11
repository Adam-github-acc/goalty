import { createContext, useEffect, useState } from "react";
import { api } from "../utils/enums";
import storage from "../utils/storage";
import useApi from './../hooks/useApi';

const GlobalContext = createContext({
  navTitle: '',
  darkTheme: false,
  isAuthenticated: false,
  goBack: false,
  setNavTitle: () => {},
  setDarkTheme: () => {},
  setIsAuthenticated: () => {},
  setGoBack: () => {},
});

export default GlobalContext;

export function GlobalContextProvider({ children }) {
  const [navTitle, setNavTitle] = useState('Home');
  const [darkTheme, setDarkTheme] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {data: companies, error, isLoading, fetchData} = useApi();
  const [goBack, setGoBack] = useState(false);

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
    goBack,
    setNavTitle,
    setDarkTheme,
    setIsAuthenticated,
    setGoBack
  };

  return (
    <GlobalContext.Provider value={context}>
      { children }
    </GlobalContext.Provider>
  )
}