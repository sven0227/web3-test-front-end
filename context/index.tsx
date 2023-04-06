import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getAccounts, getAppStatus, getHistory } from "../src/utils/apiRoutes";
interface IAppContext {
  history: { data: any[], totalCount: number };
  setHistory: any;
  accounts: { data: any[] };
  setAccounts: any;
  getHistoryFunc: any;
  getAccountsFunc: any;
  appStatus: {
    elapsedTime: string
    isMigrating: boolean
    isListening: boolean
    percent: string
    latestBlockNumber: number
  };
  getAppStatusFunc: any;
}

interface IAppContextProvider {
  children: any;
}

const defaultState = {
  history: { data: [], totalCount: 0 },
  setHistory: () => { },
  accounts: { data: [] },
  setAccounts: () => { },
  getHistoryFunc: () => { },
  getAccountsFunc: () => { },
  appStatus: { elapsedTime: "", isMigrating: false, isListening: false, percent: "", latestBlockNumber: 0 },
  getAppStatusFunc: () => { },
}

const AppContext = createContext<IAppContext>(defaultState);

export function AppContextProvider({ children }: IAppContextProvider) {
  const [history, setHistory] = useState(defaultState.history);
  const [accounts, setAccounts] = useState(defaultState.accounts);
  const [appStatus, setAppStatus] = useState(defaultState.appStatus);

  useEffect(() => {
    const timer = setInterval(() => {
      getAppStatusFunc();
    }, 5000);
    return () => clearInterval(timer);
  }, [])

  const getHistoryFunc = async (pageNumber = 1, pageSize = 10) => {
    try {
      const { data: data } = await axios.post(getHistory, { pageNumber: pageNumber, pageSize: pageSize })
      console.log(data);
      setHistory(data)
    } catch (error) {
      console.log(error);
    }
  }

  const getAccountsFunc = async (pageNumber = 1, pageSize = 10) => {
    const data = await axios.post(getAccounts, { pageNumber: pageNumber, pageSize: pageSize });
    console.log(data);
    setAccounts(data);
  }

  const getAppStatusFunc = async (pageNumber = 1, pageSize = 10) => {
    const { data } = await axios.get(getAppStatus, {});
    console.log(data.data);
    setAppStatus(data.data);
  }

  return (
    <AppContext.Provider
      value={{
        history, setHistory,
        accounts, setAccounts,
        getHistoryFunc, getAccountsFunc,
        appStatus, getAppStatusFunc,
      }}
    >
      {children}
    </AppContext.Provider>

  )
}

export function useAppContext() {
  return useContext(AppContext);
}