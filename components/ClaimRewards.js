import { useContext } from "react";
import Button from "./Button";
import { ApiContext } from "../context/ApiProvider";
import { AccountContext } from "../context/AccountProvider";
import { ContractContext } from "../context/ContractProvider";
import BN from "bn.js"
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import { sendTransaction } from "@astar-network/astar-sdk-core";

const ClaimRewards = (refBtConnect) => {
  const { api } = useContext(ApiContext);
  const { account } = useContext(AccountContext);
  const { rewardManagerContract } = useContext(ContractContext)
  //let currentAccount = undefined;
  let [injector, setInjector] = useState(undefined);

  useEffect (()=>{
    const loadInjector = async () => {
      const { getWalletBySource} = await import('@talismn/connect-wallets');
      console.log(account.source)
      const i = await getWalletBySource(account.source);
      await i.enable('Lucky')
      setInjector(i)
    }
    loadInjector();
  },[account]);

  const claim = async () => {

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
    if (result.isErr) {
      let error = ''
      if (result.asErr.isModule) {
        const dispatchError = api.registry.findMetaError(result.asErr.asModule)
        error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
      } else {
        error = result.asErr.toString()
      }

      console.error(error)
      return
    }

    // Even if the result is Ok, it could be a revert in the contract execution
    if (result.isOk) {
      const flags = result.asOk.flags.toHuman()
      // Check if the result is a revert via flags
      if (flags.includes('Revert')) {
        const type = rewardManagerContract.abi.messages[5].returnType // here 5 is the index of the message in the ABI
        const typeName = type?.lookupName || type?.type || ''
        const error = rewardManagerContract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman()

        console.log(error ? error.Ok.Err.toString() : 'Revert')
        return
      }
    }

    // Gas require is more than gas returned in the query
    // To be safe, we double the gasLimit.
    // Note, doubling gasLimit will not cause spending more gas for the Tx
    const BN_TWO = new BN(2);
    const estimatedGas = api.registry.createType(
      'WeightV2',
      {
        refTime: gasRequired.refTime.toBn().mul(BN_TWO),
        proofSize: gasRequired.proofSize.toBn().mul(BN_TWO),
      }
    )

    const unsub = await rewardManagerContract.tx["psp22Reward::claim"]({
      gasLimit: estimatedGas,
      storageDepositLimit: null
    })
    .signAndSend(
      account.address,
      {signer: injector.signer}, 
      (res) => {
      // Send the transaction, like elsewhere this is a normal extrinsic
      // with the same rules as applied in the API (As with the read example,
      // additional params, if required can follow)
      if (res.status.isInBlock) {
        console.log('in a block')
      }
      if (res.status.isFinalized) {
        console.log('Successfully sent the tx')
        unsub()
      }
    })

  }

  /*
  const claim2 = async () => {

    try {
      const result = await sendTransaction(
        api, // The api instance of type ApiPromise
        rewardManagerContract, // The contract instance of type ContractPromise
        "psp22Reward::claim", // The message to send or transaction to call
        //account.address, // The sender address
        //new BN("1000000000000000000") // 1 TOKEN or it could be value you want to send to the contract in title
      );

      // Sign and send the transaction
      // The result is a promise that resolves to unsubscribe function
      const unsub = await result.signAndSend(account.address, (res) => {
        if (res.status.isInBlock) {
          console.log("in a block");
        }
        if (res.status.isFinalized) {
          console.log("finalized");
          console.log("Successfully claimed!");
          unsub();
        }
      });
    } catch (error) {
      // If there is an error, it will be thrown here
      console.log(error);
    }

  }

  const claim = async () => {
    try {
      // maximum gas to be consumed for the call. if limit is too small the call will fail.
      
      const gasLimit = api.registry.createType(
        'WeightV2',
        api.consts.system.blockWeights['maxBlock']
      )
      console.log("MaxBlock",api.consts.system.blockWeights['maxBlock'].toHuman())
      console.log("gasLimit",gasLimit.toHuman())
      const { gasRequired, storageDeposit, result } = await rewardManagerContract.query['psp22Reward::claim'](
        account.address,
        {
          gasLimit: gasLimit,
          storageDepositLimit: null
        }
      )
      console.log("GASREQUIRED",gasRequired.toHuman(),storageDeposit.toHuman(),result.toHuman())
      // a limit to how much Balance to be used to pay for the storage created by the contract call
      // if null is passed, unlimited balance can be used
      const storageDepositLimit = null;
      
      rewardManagerContract.tx['psp22Reward::claim'](
        { storageDepositLimit, gasRequired }
      )
      .signAndSend(
        account.address,
        {signer: injector.signer}, 
        (result) => {
        try {
          console.log('Transaction status:', result.status.type);
          //toast('Transaction status: '+ result.status.type)
          if (result.status.isBroadcast) {
            toast('Sending Transaction...')
          }
          if (result.status.isInBlock || result.status.isFinalized) {
              console.log('Transaction hash: '+ result.txHash.toHex());
              console.log("https://shibuya.subscan.io/extrinsic/"+result.txHash.toHex())
              toast('Transaction hash: '+ result.txHash.toHex())
              result.events.forEach(({ phase, event : {data, method, section}} ) => {
                  console.log(' %s : %s.%s:: %s', phase, section, method, data);
                  //toast(phase+":"+section+"."+method+"::"+data);
                  if (section == 'system' && method == 'ExtrinsicSuccess'){
                      console.log('Success');
                      toast('Success');
                  } else if (section == 'system' && method == 'ExtrinsicFailed'){
                      console.log('Failed');
                      toast('Failed');
                  }
              });
          } else if (result.isError){
              console.log('Error');
              toast('Error');
          }
        }
        catch (error) {
          console.log(":((( transaction failed", error);
          toast('transaction failed :(');
        }
      }
      
      ).catch((error) => {
        console.log("TxError: "+error)
        toast('TxError error: '+error);
      });       
    
    } catch (error) {
      console.log(":( transaction failed", error);
      toast(':( transaction failed');
    }
  };
  */
  

  return (
  <>
    <span className="cursor-pointer" enable={rewardManagerContract} onClick={() => claim()}>
      <Button title="Claim" />
    </span>
  </>
  );
};
export default ClaimRewards;
