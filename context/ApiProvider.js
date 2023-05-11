import { ApiPromise, WsProvider } from "@polkadot/api";
import React, { useState, useEffect } from "react";
import { options } from "@astar-network/astar-api";
import { PROVIDER_ENDPOINTS } from "../artifacts/constants";

export const ApiContext = React.createContext();

export const ApiProvider = ({queryNetwork, children }) => {
  const [api, setapi] = useState();
  const [network, setNetwork] = useState(queryNetwork);

  useEffect(() => {
    connectApi();
  }, [network]);

  const connectApi = async () => {
    try { 
      const provider = new WsProvider(PROVIDER_ENDPOINTS[network]);
      const apiPromise = new ApiPromise(options({ provider }));
      await apiPromise.isReady;
      setapi(apiPromise);
      console.log("connected to "+network+" API: "+PROVIDER_ENDPOINTS[network])
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