import ClaimRewards from "./ClaimRewards";
import { formatAddressShort } from "../lib/formatAddressShort";
import { formatAddress } from "../lib/formatAddress";
import { formatTokenBalance } from "../lib/formatTokenBalance";
import { useAccountStakeData } from "../artifacts/useAccountStakeData";
import { useAccountRewardsData } from "../artifacts/useAccountRewardsData";
import { CONTRACT_STAKING_URL } from "../artifacts/constants";
import { SS58_PREFIX } from "../artifacts/constants";
import { useContext, useEffect } from "react";
import { AccountContext } from "../context/AccountProvider";
import { ApiContext } from "../context/ApiProvider";
import { ContractContext } from "../context/ContractProvider";
import Image from "next/image";
import LuckyLogo from "../assets/lucky.svg";

const style = {
  wrapper: `flex items-center justify-center mt-14`,
  content: `md:w-[500px] content-block bg-[#191B1F] rounded-2xl px-8 py-8 `
};

const AccountInfos = () => {
  
  const { account } = useContext(AccountContext)
  const { network } = useContext(ApiContext)
  const { currentEraStake, hasClaimed } = useContext(ContractContext)
  const address = formatAddress(account?.address,network)
  const stakeData = useAccountStakeData(address,network)
  const rewardsData = useAccountRewardsData(address,network)

  useEffect(() => {
    rewardsData.refetch()
  }, [hasClaimed]);

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
    if (account) {
      if (rewardsData?.data?.accounts?.nodes[0]) {
        totalPending = formatTokenBalance(rewardsData.data?.accounts.nodes[0].totalPending)
      }
      else totalPending=0 
      if (totalPending!=0 && !hasClaimed) {
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
                <a className="tweetbutton" href="http://twitter.com/share?text=I won the LuckyRaffle 💰🥳%0AStake your $ASTR $SDN and be the lucky guy next time 🍀&url=https://lucky.substrate.fi&hashtags=AstarNetwork,LuckyDapp">
                  <i></i>Share on Twitter</a>
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
        totalPending = formatTokenBalance(rewardsData.data?.accounts.nodes[0].totalPending)
      }
      else { totalClaimed=0, totalPending=0}

      /*
      */ 
      if (totalStake!==0 || totalClaimed!==0 || totalPending!==0 ) {
        return <div>
        <div className="py-1 text-xl"><span>Your stake: </span><span>{totalStake}</span></div>
        <div className="py-1"><span>Already claimed: </span><span>{totalClaimed}</span></div>
        <div className="py-1"><span>Pending Rewards: </span><span>{totalPending}</span></div>
      </div>
      }
      else if (totalStake==0 && totalClaimed==0 && totalPending==0 ) {
        return <div className="flex items-center justify-center">
            <span>You don't have any stake or rewards yet on Lucky <Image className="inline" src={LuckyLogo} alt="Lucky" height={20} width={20} /></span>
        </div>
      }
      
    }
    else if (stakeData.isFetching){
      return <div className="flex items-center justify-center">
        <span>Loading... <Image className="inline" src={LuckyLogo} alt="Lucky" height={20} width={20} /></span>
      </div>
    } 
    else if (!account) {
      return <div className="flex items-center justify-center">
        <span>Connect account to get Lucky <Image className="inline" src={LuckyLogo} alt="Lucky" height={20} width={20} /></span>
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
