import React, { useState, useEffect, useContext } from "react";
import { Abi, ContractPromise } from "@polkadot/api-contract";
import { Keyring } from "@polkadot/api";
import { ApiContext } from "../context/ApiProvider";
import { AccountContext } from "../context/AccountProvider";
import { LOTTO_CONTRACT_ABI_METADATA, LOTTO_CONTRACT_ADDRESS } from "../artifacts/constants";
import BN from "bn.js"
import toast from 'react-hot-toast';

export const LottoContractContext = React.createContext();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const LottoContractProvider = ({ children }) => {
  const { api, network } = useContext(ApiContext);
  const { account } = useContext(AccountContext);
  const [lottoContract, setLottoContract] = useState();
  const [participateDryRunRes,setParticipateDryRunRes] = useState(undefined)

  useEffect(() => {
    if (api) loadLottoContract();
  }, [api]);
  
  useEffect(()=>{
    if (lottoContract && account) {
      doParticipateDryRun();
    }
  },[lottoContract,account]) 

  const doParticipateDryRun = async (numbers) => {
    if (account) {
      const { gasRequired, result, error } = await dryRun("participate",account,numbers);;
      const res = { gasRequired, result, error }
      //setParticipateDryRunRes(res)
      return res
    }
  }

  const doGetCurrentRaffleIdDryRun = async () => {
    if (account) {
      const funcName = "raffle::getDrawNumber"
      const { resultToHuman, error } = await dryRun(funcName,account);;
      const res = { resultToHuman, error }
      console.log("resultToHuman",resultToHuman)
      return res
    }
  }

  const loadLottoContract = async () => {
    try { 
      const abi = new Abi(LOTTO_CONTRACT_ABI_METADATA[network], api.registry.getChainProperties());
      const contract = new ContractPromise(api, abi, LOTTO_CONTRACT_ADDRESS[network]);
      //console.log("CONTRACT-----",contract)
      
      setLottoContract(contract);
    } catch (error) {
      console.error("Error in loadLottoContract", error);
    }
  };

  /**
     * Generic function dryRun
     */
  const dryRun = async(funcName,account,...args)=>{
    const contract = lottoContract
    //console.log("dryRun: args",args)
    // Get the initial gas WeightV2 using api.consts.system.blockWeights['maxBlock']
    const gasLimit = api.registry.createType(
      'WeightV2',
      api.consts.system.blockWeights['maxBlock']
    )
    // Query the contract message
    // This will return the gas required and storageDeposit to execute the message
    // and the result of the message
    //(contract.query)
    const contractPromise = lottoContract.query[funcName](
      account.address,
      {
        gasLimit: gasLimit
      },
      ...args
    )

    const abiIndex = contract.query[funcName].meta.index
    const type = lottoContract.abi.messages[abiIndex].returnType 
    const typeName = type?.lookupName || type?.type || ''

    const { gasRequired, storageDeposit, result, output } = await contractPromise;

    //console.log("dryrun result",result, result.isErr ? result.asErr : result.asOk)
    // Check for errors
    let error = undefined
    let resultToHuman = undefined

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
        error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman()
        error = error ? error.Ok?.Err?.RaffleError : 'Revert'
      }
      
      resultToHuman = lottoContract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman()
    }
    //console.log("DryRun error?:",error)
    return { gasRequired, storageDeposit, result, resultToHuman, output, error }
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

  const participate = async (numbers) => {
    const res = await doParticipateDryRun(numbers)
    const { gasRequired, error } = res

    if (error) {
      toast.error(
        error,
        {position: 'bottom-right'}
      )
      //return
    }
    const txToast = toast.loading(
      'Sending Lotto:Participate...',
      {
        position: 'bottom-right',
      }
    );

    //if (!error) {
    let txError = undefined;
    
    const unsub = await lottoContract.tx["participate"]({
      gasLimit: getEstimatedGas(gasRequired),
      storageDepositLimit: null
    },numbers)
    .signAndSend(
      account.address,
      (res) => {
        //console.log("RES.events",res.events)
        res.events.forEach(({ phase, event: { data, method, section } }) => {
          if (method === "ExtrinsicFailed") {
            txError = "ExtrinsicFailed"
    
          }
          //console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
          //console.log("status",res.status.toString())
        });
        
      //console.log("method",res.method,res.data.toString())
      if (res.status.isInBlock) {
        toast.loading('Transaction is in block',{id:txToast});
      }
      if (res.status.isFinalized) {
        toast.dismiss(txToast)
        let txMessage;
        if (txError) txMessage="Transaction Failed ("+txError+")"
        else txMessage="Transaction sent successfully"
        const toastValue = (t) => (
          <span className="toast-tx-result text-right">
            {txMessage}<br/><a target="_blank" href={"https://"+network+".subscan.io/extrinsic/"+res.txHash.toHex()}>show in Subscan</a>
            <button className="btn-tx-result" onClick={() => toast.dismiss(t.id)}> close </button>
          </span>
        )
        const toastOptions = {
          duration: 6000000,
          position: 'bottom-right',
          style: {maxWidth:600},
        }
        if (txError) toast.error(toastValue,toastOptions);
        else toast(toastValue,toastOptions);
        setHasClaimed(true)
        unsub()
      }
    }).catch((error) => {
      toast.dismiss(txToast)
      toast.error("Transaction Failed: "+error.toString(),{
        position: 'bottom-right',
        style: {maxWidth:600},
      });
    });     
    //}
    
  }

  const batchParticipate = async (numbers_batch) => {
    
    const dryRunBatch = new Map()
  
    const txBatch = []
    await numbers_batch.forEach(async (numbers)=>{
      //const dryRunRes = await dryRunBatch.get(numbers.join("."))
      const dryRunRes = await doParticipateDryRun(numbers)
      
      console.log(dryRunRes)
      txBatch.push(await lottoContract.tx["participate"]({
        gasLimit: getEstimatedGas(dryRunRes.gasRequired),
        storageDepositLimit: null
      },numbers))
    })

    console.log(txBatch)

   if (txBatch.length !== numbers_batch.length ) {
      sleep(5000).then(async () => { 

        let txError = undefined;
        //console.log("lottoContract",lottoContract)
        console.log("txBatch",txBatch)
        const unsub = await lottoContract.api.tx.utility.batch(txBatch)
        .signAndSend(
          account.address,
          (res) => {
            //console.log("--res--",res,res.events)
            
            res.events.forEach(({ phase, event: { data, method, section } }) => {
              if (method === "ExtrinsicFailed") {
                txError = "ExtrinsicFailed"
              }
              //console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
              //console.log("status",res.status.toString())
            });
            
            console.log("res.status",res.status,res.status.toString())
            console.log("res status...",res.status.broadcast,res.status.inBlock,res.status.finalized)
            if (res.status.inBlock) {
              toast.loading('Transaction is in block',{id:txToast});
            }
            if (res.status.finalized) {
              toast.dismiss(txToast)
              let txMessage;
              if (txError) txMessage="Transaction Failed ("+txError+")"
              else txMessage="Transaction sent successfully"
              const toastValue = (t) => (
                <span className="toast-tx-result text-right">
                  {txMessage}<br/><a target="_blank" href={"https://"+network+".subscan.io/extrinsic/"+res.txHash.toHex()}>show in Subscan</a>
                  <button className="btn-tx-result" onClick={() => toast.dismiss(t.id)}> close </button>
                </span>
              )
              const toastOptions = {
                duration: 6000000,
                position: 'bottom-right',
                style: {maxWidth:600},
              }
              if (txError) toast.error(toastValue,toastOptions);
              else toast(toastValue,toastOptions);
              setHasClaimed(true)
              unsub()
            }
          }).catch((error) => {
            toast.dismiss(txToast)
            toast.error("Transaction Failed: "+error.toString(),{
              position: 'bottom-right',
              style: {maxWidth:600},
            });
          });     
        //}

       });
    }

    
    
  }

  return (
    <LottoContractContext.Provider
      value={{
        api,
        lottoContract,
        participate,
        batchParticipate,
        doParticipateDryRun,
        participateDryRunRes,
        doGetCurrentRaffleIdDryRun
      }}
    >
      {children}
    </LottoContractContext.Provider>
  );
};