import { ApiPromise, WsProvider } from "@polkadot/api";
import React, { useState, useEffect } from "react";
export const ConnectContext = React.createContext();

const WS_PROVIDER = "wss://rpc.shibuya.astar.network";
const DAPP_NAME = "Lucky";
export const ConnectProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [api, setapi] = useState();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      const { web3Enable, web3Accounts } = await import(
        "@polkadot/extension-dapp"
      );
      const extensions = await web3Enable(DAPP_NAME);
      if (extensions.length === 0) {
        // no extension installed, or the user did not accept the authorization
        // in this case we should inform the use and give a link to the extension
        return;
      }
      const provider = new WsProvider(WS_PROVIDER);

      const api = await ApiPromise.create({ provider });
      setapi(api);
      const allaccounts = await web3Accounts();
      const account = allaccounts[0];
      setCurrentAccount(account);
    } catch (error) {
      console.error(error);
    }
  };
  const checkIfWalletIsConnected = async () => {
    try {
      const { web3Enable, web3Accounts } = await import(
        "@polkadot/extension-dapp"
      );
      const extensions = await web3Enable(DAPP_NAME);
      if (extensions.length === 0) {
        return;
      }
      const allaccounts = await web3Accounts();
      if (allaccounts.length) {
        setCurrentAccount(allaccounts[0]);
      }
      const provider = new WsProvider(WS_PROVIDER);
      const api = await ApiPromise.create({ provider });
      setapi(api);
      await api.isReady;
      const account = allaccounts[0];
      setCurrentAccount(account);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ConnectContext.Provider
      value={{
        currentAccount,
        connectWallet,
        api,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};
