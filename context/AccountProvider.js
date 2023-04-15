import React, { useEffect, useState, useContext } from "react";
import { setToStorage, getFromStorage } from "../lib/storage";
import { ApiContext } from "../context/ApiProvider";

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  const { api } = useContext(ApiContext);
  const [account, setStateAccount] = useState(undefined);
  let lsAccount = undefined;

  useEffect (()=>{
    const loadSigner = async () => {
      console.log("using account: "+account.address)
      const { getWalletBySource} = await import('@talismn/connect-wallets');
      //console.log(account.source)
      const injector = await getWalletBySource(account.source);
      await injector.enable('Lucky')
      api.setSigner(injector.signer)
      
    }
    if (api && account && account!== "undefined") loadSigner();
  },[account,api]);

  useEffect(()=>{
    loadAccount()
  },[])
  
  const loadAccount = () => {
    lsAccount = getFromStorage("account",true)
    //console.log("lsAccount",lsAccount)
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