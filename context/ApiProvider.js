import { ApiPromise, WsProvider } from "@polkadot/api";
import React, { useState, useEffect } from "react";

export const ApiContext = React.createContext();

const WS_PROVIDER = "wss://rpc.shibuya.astar.network";

export const ApiProvider = ({ children }) => {
  
  const [api, setapi] = useState();
  const [network, setNetwork] = useState("shibuya");

  useEffect(() => {
    connectApi();
  }, []);

  const connectApi = async () => {
    try { 
      const provider = new WsProvider(WS_PROVIDER);
      const api = await ApiPromise.create({ provider });
      setapi(api);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        api,
        network,
        setNetwork
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};