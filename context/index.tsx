import { createContext, useContext, useState } from "react";
import axios from "axios";
import { getHistory } from "../src/utils/apiRoutes";
interface IAppContext {
  history: Array<any>;
  setHistory: any;
  accounts: Array<any>
  setAccounts: any;
  getHistoryFunc: any;
}

interface IAppContextProvider {
  children: any;
}

const defaultState = {
  history: [],
  setHistory: () => { },
  accounts: [],
  setAccounts: () => { },
  getHistoryFunc: () => { },
}

const AppContext = createContext<IAppContext>(defaultState);

export function AppContextProvider({ children }: IAppContextProvider) {
  const [history, setHistory] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const getHistoryFunc = async () => {
    try {
      const { data: data } = await axios.post(getHistory, { pageNumber: 1, pageSize: 10 })
      console.log(data);
      setHistory(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppContext.Provider
      value={{
        history, setHistory,
        accounts, setAccounts,
        getHistoryFunc,
      }}
    >
      {children}
    </AppContext.Provider>

  )
}

export function useAppContext() {
  return useContext(AppContext);
}