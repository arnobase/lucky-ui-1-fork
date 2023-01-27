import { ApiPromise, WsProvider } from "@polkadot/api";
import React, { useState, useEffect } from "react";
export const ConnectContext = React.createContext();

const WS_PROVIDER = "wss://rpc.shibuya.astar.network";
const DAPP_NAME = "Lucky";

export const ConnectProvider = ({ children }) => {
  const [api, setapi] = useState();

  useEffect(() => {
    connectApi();
  }, []);

  const connectApi = async () => {
    try {
      const provider = new WsProvider(WS_PROVIDER);
      const api = await ApiPromise.create({ provider });
      setapi(api);
      await api.isReady;
     
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ConnectContext.Provider
      value={{
        api,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};
