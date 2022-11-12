import { createContext, useEffect, useState } from "react";
import { api } from "../utils/enums";
import storage from "../utils/storage";
import useApi from './../hooks/useApi';

const GlobalContext = createContext({
  navTitle: '',
  darkTheme: false,
  isAuthenticated: false,
  goBack: false,
  refresh: false,
  setNavTitle: () => {},
  setDarkTheme: () => {},
  setIsAuthenticated: () => {},
  setGoBack: () => {},
  setRefresh: () => {}
});

export default GlobalContext;

export function GlobalContextProvider({ children }) {
  const [navTitle, setNavTitle] = useState('Home');
  const [darkTheme, setDarkTheme] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {data: companies, error, isLoading, fetchData} = useApi();
  const [goBack, setGoBack] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => setIsAuthenticated(await storage.get('user') !== undefined))();
    const url = api.baseUrl + api.v1prefix + api.companyPrefix;

    fetchData(url);
  }, [refresh])

  const context = {
    navTitle,
    darkTheme,
    isAuthenticated,
    companies,
    goBack,
    refresh,
    setNavTitle,
    setDarkTheme,
    setIsAuthenticated,
    setGoBack,
    setRefresh
  };

  return (
    <GlobalContext.Provider value={context}>
      { children }
    </GlobalContext.Provider>
  )
}