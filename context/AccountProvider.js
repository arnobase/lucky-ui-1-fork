import React, { useEffect, useState } from "react";
import { setToStorage, getFromStorage } from "../lib/storage";

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  
  const [account, setStateAccount] = useState(undefined);
  let lsAccount = undefined;

  useEffect(()=>{
    loadAccount()
  },[])
  
  const loadAccount = () => {
    lsAccount = getFromStorage("account",true)
    console.log("lsAccount",lsAccount)
    if (typeof lsAccount !== "undefined" && lsAccount !== null) {
      setStateAccount(lsAccount)
    }
  }

  const setAccount = (a) => {
    setToStorage("account",a,true)
    setStateAccount(a)
  }

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        loadAccount
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};