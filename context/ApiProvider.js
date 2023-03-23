import { ApiPromise, WsProvider } from "@polkadot/api";
import React, { useState, useEffect } from "react";
import { options } from "@astar-network/astar-api";
export const ApiContext = React.createContext();

export const ApiProvider = ({ children }) => {
  
  const [api, setapi] = useState();
  const [network, setNetwork] = useState("shibuya");

  useEffect(() => {
    connectApi();
  }, []);

  const connectApi = async () => {
    try { 
      const provider = new WsProvider(PROVIDER_ENDPOINTS[network]);
      const api = new ApiPromise(options({ provider }));
      await api.isReady;
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