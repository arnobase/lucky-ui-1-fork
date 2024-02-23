import * as polkadotCryptoUtils from "@polkadot/util-crypto";
import * as polkadotUtils from "@polkadot/util";

import { setToStorage, getFromStorage } from "../lib/storage";

import ClaimFromRewards from "./ClaimFromRewards";
import { formatAddressShort } from "../lib/formatAddressShort";
import { formatAddress } from "../lib/formatAddress";
import { formatTokenBalance } from "../lib/formatTokenBalance";
import { useAccountStakeByPeriodDataAll } from "../artifacts/useAccountStakeByPeriodData";

import { SS58_PREFIX } from "../artifacts/constants";
import { CONTRACT_STAKING_URL } from "../artifacts/constants";
import { useContext, useEffect, useState, useCallback, useMemo, useRef } from "react";

import { ApiContext } from "../context/ApiProvider";
import { ContractContext } from "../context/ContractProvider";
import { EraEtaContext } from "../context/EraEtaProvider";
import { AccountContext } from "../context/AccountProvider";

import { useAccountRewardsData } from "../artifacts/useAccountRewardsData";
import { useAccountStakeData } from "../artifacts/useAccountStakeData";

import { HiMiniClipboardDocument } from "react-icons/hi2";

import BN from "bn.js";

const style = {
  wrapper: `flex items-center justify-center mt-4`,
  content: `md:w-[500px] content-block bg-[#191B1F] rounded-2xl px-8 py-4 `,
  inputext: `bg-[#191B1F] ring-grey focus:ring-[rgba(116,190,100,1)] focus:border-[rgba(116,190,100,1)] text-white px-2 py-1 mb-3 w-full rounded-lg`
};

function CheckEvmAddress() {
  
  const { api, rewardManagerContract, claimFrom, doClaimFromDryRun, claimFromDryRunRes } = useContext(ContractContext)
  const [addressInput, setAddressInput] = useState()
  const [isEVM, setIsEVM] = useState()
  //const [isEvmChecked, setIsEvmChecked] = useState()
  const [stakeByPeriod,setStakeByPeriod] = useState()
  const refIsEvm = useRef()

  const { account, refWallet } = useContext(AccountContext)
  const { network } = useContext(ApiContext)
  const { period,subPeriod } = useContext(EraEtaContext)

  useEffect(()=>{
    const _evmAddress = polkadotCryptoUtils.isEthereumAddress(getFromStorage("evmAddress")) ? getFromStorage("evmAddress") : ""
    setAddressInput(_evmAddress)
    const _isEVM = (!getFromStorage("isEVM") || getFromStorage("isEVM") === "false" || _evmAddress === "") ? false : true
    console.log(!getFromStorage("isEVM"),getFromStorage("isEVM"))
    console.log("_isEVM",_isEVM)
    setIsEVM(_isEVM)
    console.log("refIsEvm.current",refIsEvm.current.checked)
    refIsEvm.current.checked = _isEVM ? "checked" : ""
  },[])

  const evmToPlm = useCallback((prefix) => {
    //console.log("evmToPlm")
    if (
      addressInput &&
      polkadotCryptoUtils.isEthereumAddress(addressInput)
    ) {
      return polkadotCryptoUtils.evmToAddress(addressInput, prefix);
    } else {
      return undefined;
    }
  }, [addressInput]);

  useEffect(()=>{
    setToStorage("isEVM",isEVM)
    setToStorage("evmAddress",addressInput)
  },[isEVM, addressInput])



  const resultAddress_5 = useMemo(() => {
    return evmToPlm(5)
  }, [addressInput]);
  const resultAddress_42 = useMemo(() => {
    return evmToPlm(42)
  }, [addressInput]);



  const stakeByPeriodDataAll = useAccountStakeByPeriodDataAll(resultAddress_5,network,period)
  const stakeData = useAccountStakeData(resultAddress_42,network)
  const rewardsData = useAccountRewardsData(resultAddress_42,network)

  useEffect(()=>{
    async function doit (){
      console.log("doit")
      const res = await doClaimFromDryRun(resultAddress_5)
      console.log("Res Dry Run",res)
    }
    
    if (resultAddress_5 && api && rewardManagerContract) {
      doit()
    }
  },[resultAddress_5, api, rewardManagerContract])

  useEffect(()=>{
    console.log("claimFromDryRunRes",claimFromDryRunRes)
  },[claimFromDryRunRes])

  useEffect(()=>{
    if (stakeByPeriodDataAll) {
      //console.log("stakeByPeriodDataAll",stakeByPeriodDataAll.data?.stakes?.nodes)
      if (stakeByPeriodDataAll.data?.stakes?.nodes !== undefined) {
        let sum = new BN(0)
        stakeByPeriodDataAll.data?.stakes?.nodes.forEach((ele)=>{
          sum=sum.add(new BN(ele.amount))
        })
        setStakeByPeriod(String(sum))
        //setStakeByPeriod(stakeByPeriodDataAll.data?.stakes?.nodes.reduce((n, {amount}) => n + amount, 0))
      }
      else setStakeByPeriod(String(0))
    }
    else setStakeByPeriod(String(0))
  },[stakeByPeriodDataAll])

  useEffect(()=>{
    stakeByPeriodDataAll.refetch()
    stakeData.refetch()
    rewardsData.refetch()
  },[resultAddress_42,network,period])

  const totalPending = useMemo(()=>{
    return rewardsData?.data?.accounts?.nodes[0] ? rewardsData.data?.accounts.nodes[0].totalPending : 0
  })
  
  const totalClaimed = useMemo(()=>{
    return rewardsData?.data?.accounts?.nodes[0] ? rewardsData.data?.accounts.nodes[0].totalClaimed : 0
  })

useEffect(()=>{
  console.log("StakeData",rewardsData?.data?.accounts?.nodes[0])
},[rewardsData])

  function Claim(){
    if((claimFromDryRunRes && claimFromDryRunRes.error===undefined)){
      return <div><div className="py-1"><span className="pl-12 float-right">{account ? <ClaimFromRewards from={resultAddress_42} /> : <><span className="underline cursor-pointer" onClick={()=>{refWallet.current.click()}}>Connect Substrate account to claim</span></>}</span></div></div>
    }  
  }
  
  function AccountInfos() {
    if (resultAddress_5) {
      return <>
        <div className="py-1">
          <span>Address: </span>
          <span className="inline">
            {formatAddressShort(resultAddress_5,SS58_PREFIX[network])}
            &nbsp;
            <HiMiniClipboardDocument 
              className="inline hover:cursor-pointer" 
              onClick={() => {navigator.clipboard.writeText(resultAddress_5)}}
            />
          </span>
          <a className="float-right font-medium underline"
            target="_blank"
            href={CONTRACT_STAKING_URL[network]}
            >Manage your stake
          </a>
        </div>
        <div className="py-1 text-xl"><span>Stake for this period: </span><span>{formatTokenBalance(stakeByPeriod)}</span></div>
        <div className="py-1"><span>Already claimed: </span><span>{formatTokenBalance(totalClaimed)}</span></div>
        <div className="py-1"><span>Pending Rewards: </span><span>{formatTokenBalance(totalPending)}</span></div>
        
        <Claim />
      </>
    }
    
  }

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.content}>
        {isEVM}
          <div className="flex justify-end items-end w-100">
            <label className="inline-flex cursor-pointer">
              <label className="inline-block pl-[0.15rem] hover:cursor-pointer mr-2" for="flexSwitchCheckDefault">Check an EVM Address</label>
              <input ref={refIsEvm} type="checkbox" role="switch" className="sr-only peer" id="flexSwitchCheckDefault"
                onChange={(e) => {console.log(e.target.checked);setIsEVM(e.target.checked)}}
              />
              <div className="relative w-9 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all after:bg-gray-700 peer-checked:border-gray-600 peer-checked:bg-[rgba(116,190,100,1)]"></div>
            </label>
          </div>
          
          {isEVM?<><p>Input EVM address</p>
          <input
            className={style.inputext}
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
          ></input>
          <AccountInfos /></>:<></>}
        </div>
      </div>
    </>
  );
};
export default CheckEvmAddress;
