import { useContext } from "react";
import Button from "./Button";
import { ApiContext } from "../context/ApiProvider";
import { AccountContext } from "../context/AccountProvider";
import { REWARD_MANAGER_CONTRACT_ABI, REWARD_MANAGER_CONTRACT_ADDRESS } from "../artifacts/constants";
import { ContractPromise } from "@polkadot/api-contract";
import toast from 'react-hot-toast';
import { useEffect } from "react";

const ClaimRewards = (refBtConnect) => {
  
  const { api } = useContext(ApiContext);
  const { account } = useContext(AccountContext);
  let currentAccount = undefined;
  let injector = undefined;

  useEffect (()=>{
    const loadInjector = async () => {
      const { web3FromSource } = await import('@talismn/connect-components');
       //const { web3FromSource } = await import("@polkadot/extension-dapp");
      currentAccount = account
      console.log(currentAccount.source)
      injector = await web3FromSource(currentAccount.source);
      console.log("INJECTTTTTTTTT",injector)
    }
    loadInjector();
  },[account]);


  const claim = async () => {
    try {
      console.log("accountProvider:"+account);
      console.log(JSON.stringify(account, null, 2))
      // maximum gas to be consumed for the call. if limit is too small the call will fail.
      const gasLimit = 30000n * 1000000n;
      // a limit to how much Balance to be used to pay for the storage created by the contract call
      // if null is passed, unlimited balance can be used
      const storageDepositLimit = null;

      const rewardManagerContract = new ContractPromise(api, REWARD_MANAGER_CONTRACT_ABI, REWARD_MANAGER_CONTRACT_ADDRESS);

      console.log('Claim ...');
      
      rewardManagerContract.tx['psp22Reward::claim'](
        { storageDepositLimit, gasLimit }
      )
      .signAndSend(
        currentAccount.address,
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
  

  return (
    <span className="cursor-pointer" onClick={() => claim()}>
        <Button title="Claim" />
    </span>
  );
};
export default ClaimRewards;
