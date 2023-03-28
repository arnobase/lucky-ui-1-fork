import React, { useState, useEffect, useContext } from "react";
import { Abi, ContractPromise } from "@polkadot/api-contract";
import { ApiContext } from "../context/ApiProvider";
import { REWARD_MANAGER_CONTRACT_ABI_METADATA, REWARD_MANAGER_CONTRACT_ADDRESS } from "../artifacts/constants";

export const ContractContext = React.createContext();

export const ContractProvider = ({ children }) => {
  const { api } = useContext(ApiContext);
  const [rewardManagerContract, setRewardManagerContract] = useState();
  
  useEffect(() => {
    console.log("loadRewardManagerContract")
    if (api) loadRewardManagerContract();
  }, [api]);
  
  const loadRewardManagerContract = async () => {
    try { 
      const abi = new Abi(REWARD_MANAGER_CONTRACT_ABI_METADATA, api.registry.getChainProperties());
      console.log("ABI-----",abi)
      const contract = new ContractPromise(api, abi, REWARD_MANAGER_CONTRACT_ADDRESS);
      console.log("CONTRACT-----",contract)
      setRewardManagerContract(contract);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContractContext.Provider
      value={{
        rewardManagerContract
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};