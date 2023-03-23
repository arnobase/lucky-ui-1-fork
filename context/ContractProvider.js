import React, { useState, useEffect, useContext } from "react";
import { ContractPromise } from "@polkadot/api-contract";
import { ApiContext } from "../context/ApiProvider";
import { REWARD_MANAGER_CONTRACT_ABI, REWARD_MANAGER_CONTRACT_ADDRESS } from "../artifacts/constants";

export const ContractContext = React.createContext();

export const ContractProvider = ({ children }) => {
  const { api } = useContext(ApiContext);
  const [rewardManagerContract, setRewardManagerContract] = useState();
    
  useEffect(() => {
    loadContract();
  }, []);
  
  
  const loadContract = async () => {
    try { 
      setRewardManagerContract(new ContractPromise(api, REWARD_MANAGER_CONTRACT_ABI, REWARD_MANAGER_CONTRACT_ADDRESS));
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