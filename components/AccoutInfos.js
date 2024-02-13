import ClaimRewards from "./ClaimRewards";
import { formatAddressShort } from "../lib/formatAddressShort";
import { formatAddress } from "../lib/formatAddress";
import { formatTokenBalance } from "../lib/formatTokenBalance";
import { useAccountStakeData } from "../artifacts/useAccountStakeData";
import { useAccountRewardsData } from "../artifacts/useAccountRewardsData";
import { useAccountStakeByPeriodData, useAccountStakeByPeriodDataAll } from "../artifacts/useAccountStakeByPeriodData";
import { CONTRACT_STAKING_URL } from "../artifacts/constants";
import { SS58_PREFIX } from "../artifacts/constants";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../context/AccountProvider";
import { ApiContext } from "../context/ApiProvider";
import { ContractContext } from "../context/ContractProvider";
import { EraEtaContext } from "../context/EraEtaProvider";
import Image from "next/image";
import LuckyLogo from "../assets/lucky.svg";
import ExportedImage from "next-image-export-optimizer";
import BN from "bn.js";

const style = {
  wrapper: `flex items-center justify-center mt-14`,
  content: `md:w-[500px] content-block bg-[#191B1F] rounded-2xl px-8 py-8 `
};

const AccountInfos = () => {
  
  const [stakeByPeriod,setStakeByPeriod] = useState(undefined)
  const { account } = useContext(AccountContext)
  const { network } = useContext(ApiContext)
  const { currentEraStake, hasClaimed } = useContext(ContractContext)
  const { period,subPeriod } = useContext(EraEtaContext)
  const address = formatAddress(account?.address,network)
  const stakeData = useAccountStakeData(address,network)
  const rewardsData = useAccountRewardsData(address,network)
  //const stakeByPeriodData = useAccountStakeByPeriodData(address,network,period)
  const stakeByPeriodDataAll = useAccountStakeByPeriodDataAll(address,network,period)
  
  useEffect(() => {
    rewardsData.refetch()
  }, [hasClaimed]);

  useEffect(()=>{
    if (stakeByPeriodDataAll) {
      //stakeByPeriodData.refetch()
      stakeByPeriodDataAll.refetch()
    }
  },[period,address])

  /*
  useEffect(()=>{
    if (stakeByPeriodData) {
      console.log("stakeByPeriodData",stakeByPeriodData)
      if (stakeByPeriodData.data?.stakes?.aggregates?.sum?.amount) {
        const amount = stakeByPeriodData.data?.stakes?.aggregates?.sum?.amount
        console.log("typeof",typeof amount,amount)
        setStakeByPeriod(BigInt(amount))
      }
    }
  },[stakeByPeriodData])
  */


  useEffect(()=>{
    if (stakeByPeriodDataAll) {
      console.log("stakeByPeriodDataAll",stakeByPeriodDataAll.data?.stakes?.nodes)
      if (stakeByPeriodDataAll.data?.stakes?.nodes !== undefined) {
        let sum = new BN(0)
        stakeByPeriodDataAll.data?.stakes?.nodes.forEach((ele)=>{
          sum=sum.add(new BN(ele.amount))
        })
        setStakeByPeriod(String(sum))
        //setStakeByPeriod(stakeByPeriodDataAll.data?.stakes?.nodes.reduce((n, {amount}) => n + amount, 0))
      }
    }
  },[stakeByPeriodDataAll])


  function CurrentEraStake() {
    if (currentEraStake) {
      return <div>Total stake on Lucky: {formatTokenBalance(currentEraStake)}</div>
    }
  }

  function AccountAddr() {
    if (account?.address) {
      const address = account.address
      return <>
        <span>Address: </span>
        <span>{formatAddressShort(address,SS58_PREFIX[network])}</span>&nbsp;
        <a className="float-right font-medium underline"
          target="_blank"
          href={CONTRACT_STAKING_URL[network]}
          >Manage your stake
        </a>
      </>
    }
  }

  function PendingDatas() {
    let totalPending = undefined;
    let tp=0
    if (account) {
      if (rewardsData?.data?.accounts?.nodes[0]) {
        tp = rewardsData.data?.accounts.nodes[0].totalPending
        totalPending = tp > 0 ? formatTokenBalance(tp) : 0
      }
      else totalPending=0 
      console.log("totalPending",totalPending)
      if ((totalPending && tp && tp>0) && !hasClaimed) {
        return <>
        <div className={style.wrapper}>
          <div className={style.content+" pending-block"}>
            <div className="flex items-center justify-center text-2xl"> 
              <div className="text-center pb-2">🎉 Congratulations 🎉<br/>You have pending rewards</div>
            </div>
            <div>
              <div className="py-1"><span>Pending: </span><span>{totalPending}</span><span className="pl-12 float-right"><ClaimRewards /></span></div>
            </div>
          </div>
        </div>
        </>
      } 
      else if (hasClaimed) {
        return <>
        <div className={style.wrapper}>
          <div className={style.content+" pending-block"}>
            <div className="flex items-center justify-center text-2xl"> 
              <div className="text-center pb-2">Claim successfull 💰💰💰</div>
            </div>
            <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="py-4">
                <a target="_blank" className="tweetbutton" href="http://twitter.com/share?text=I won the @LuckyDapp  Raffle 💰🥳%0A%0AStake your $ASTR $SDN and be the lucky guy next time 🍀&url=https://lucky.substrate.fi&hashtags=AstarNetwork,LuckyDapp">
                  <i></i> Share on X</a>
              </div>
              <div>📢 Invite other players 📢<br/>and make the Lucky raffle bigger next time</div>
            </div>
            </div>
          </div>
        </div>
        </>
      }
    }
  }

  function StakeDatas() {
    let totalStake = undefined;
    let totalClaimed = undefined;
    let totalPending = undefined;
    if (account && stakeData?.data && rewardsData?.data) {
      if (stakeData?.data?.accounts?.nodes[0]) {totalStake = formatTokenBalance(stakeData.data?.accounts.nodes[0].totalStake)}
      else {totalStake = 0}
      if (rewardsData?.data?.accounts?.nodes[0]) {
        totalClaimed = formatTokenBalance(rewardsData.data?.accounts.nodes[0].totalClaimed)
        const total_pending = rewardsData.data?.accounts.nodes[0].totalPending > 0 ? rewardsData.data?.accounts.nodes[0].totalPending : 0
        totalPending = formatTokenBalance(total_pending)
      }
      else { totalClaimed=0, totalPending=0}

      /*
      */ 
      if (totalStake!==0 || totalClaimed!==0 || totalPending!==0 ) {
        console.log("stakeByPeriod",stakeByPeriod)
        return <div>
        <div className="py-1 text-xl"><span>Stake for this period: </span><span>{formatTokenBalance(stakeByPeriod)}</span></div>
        <div className="py-1"><span>Already claimed: </span><span>{totalClaimed}</span></div>
        <div className="py-1"><span>Pending Rewards: </span><span>{totalPending}</span></div>
        
      </div>
      }
      else if (totalStake==0 && totalClaimed==0 && totalPending==0 ) {
        return <div className="flex items-center justify-center">
            <span>You don't have any stake or rewards yet on Lucky 
              <ExportedImage className="inline"  src={LuckyLogo} alt="Lucky" height={20} width={20}  />;
            </span>
        </div>
      }
      
    }
    else if (stakeData.isFetching){
      return <div className="flex items-center justify-center">
        <span>Loading... <ExportedImage className="inline" src={LuckyLogo} alt="Lucky" height={20} width={20} /></span>
      </div>
    } 
    else if (!account) {
      return <div className="flex items-center justify-center">
        <span>Connect account to get Lucky <ExportedImage className="inline" src={LuckyLogo} alt="Lucky" height={20} width={20} /></span>
      </div>
    }
  }

  function AccountDatas () {
    return <div className={style.wrapper}>
    <div className={style.content}>
        <div>
          <div className="py-1">
            <AccountAddr/>
          </div>
          {/*<CurrentEraStake/>*/}
          <StakeDatas/>
        </div>
    </div>
   
  </div>
  }

  return (
    <>
    <PendingDatas/>
    <AccountDatas/>
    </>
  );
};
export default AccountInfos;
