import React, { useState, useEffect, useContext } from "react";
import { Abi, ContractPromise } from "@polkadot/api-contract";
import { ApiContext } from "../context/ApiProvider";
import { AccountContext } from "../context/AccountProvider";
import { REWARD_MANAGER_CONTRACT_ABI_METADATA, REWARD_MANAGER_CONTRACT_ADDRESS } from "../artifacts/constants";
import BN from "bn.js"

export const ContractContext = React.createContext();

export const ContractProvider = ({ children }) => {
  const { api } = useContext(ApiContext);
  const { account } = useContext(AccountContext);
  const [rewardManagerContract, setRewardManagerContract] = useState();
  const [claimDryRunRes,setClaimDryRunRes] = useState(undefined)

  useEffect(() => {
    console.log("loadRewardManagerContract")
    if (api) loadRewardManagerContract();
  }, [api]);
  
  useEffect(()=>{
    const doDryRun = async () => {
      const { gasRequired, result, error } = await claimDryRun();
      setClaimDryRunRes({ gasRequired, result, error })
    }
    if (rewardManagerContract) doDryRun();
  },[rewardManagerContract])

  const loadRewardManagerContract = async () => {
    try { 
      const abi = new Abi(REWARD_MANAGER_CONTRACT_ABI_METADATA, api.registry.getChainProperties());
      const contract = new ContractPromise(api, abi, REWARD_MANAGER_CONTRACT_ADDRESS);
      console.log("CONTRACT-----",contract)
      setRewardManagerContract(contract);
    } catch (error) {
      console.error(error);
    }
  };

  const claimDryRun = async()=>{
    // Get the initial gas WeightV2 using api.consts.system.blockWeights['maxBlock']
    const gasLimit = api.registry.createType(
      'WeightV2',
      api.consts.system.blockWeights['maxBlock']
    )

    // Query the contract message
    // This will return the gas required and storageDeposit to execute the message
    // and the result of the message
    const { gasRequired, storageDeposit, result } = await rewardManagerContract.query["psp22Reward::claim"](
      account.address,
      {
        gasLimit: gasLimit,
        storageDepositLimit: null
      }
    )

    // Check for errors
    let error = undefined
    if (result.isErr) {
      if (result.asErr.isModule) {
        const dispatchError = api.registry.findMetaError(result.asErr.asModule)
        error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
      } else {
        error = result.asErr.toString()
      }
    }

    // Even if the result is Ok, it could be a revert in the contract execution
    if (result.isOk) {
      const flags = result.asOk.flags.toHuman()
      // Check if the result is a revert via flags
      if (flags.includes('Revert')) {
        const type = rewardManagerContract.abi.messages[5].returnType // here 5 is the index of the message in the ABI
        const typeName = type?.lookupName || type?.type || ''
        error = rewardManagerContract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman()
        error = error ? error.Ok.Err.toString() : 'Revert'
      }
    }
    console.error(error)
    return { gasRequired, storageDeposit, result, error }
  }

  const getEstimatedGas = (gasRequired) => {
      // Gas require is more than gas returned in the query
      // To be safe, we double the gasLimit.
      // Note, doubling gasLimit will not cause spending more gas for the Tx
      const BN_TWO = new BN(2);
      return api.registry.createType(
        'WeightV2',
        {
          refTime: gasRequired.refTime.toBn().mul(BN_TWO),
          proofSize: gasRequired.proofSize.toBn().mul(BN_TWO),
        }
      )
  }

  const claim = async () => {

    const { gasRequired, error } = claimDryRunRes
    //console.log("DRYRUNRES",gasRequired, result, error)
    
    if (!error) {
      const unsub = await rewardManagerContract.tx["psp22Reward::claim"]({
        gasLimit: getEstimatedGas(gasRequired),
        storageDepositLimit: null
      })
      .signAndSend(
        account.address,
        (res) => {
        if (res.status.isInBlock) {
          console.log('in a block')
        }
        if (res.status.isFinalized) {
          console.log('Successfully sent the tx')
          unsub()
        }
      })
    }
  }

  return (
    <ContractContext.Provider
      value={{
        rewardManagerContract,
        claim,
        claimDryRun,
        claimDryRunRes
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};