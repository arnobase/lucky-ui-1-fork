import ClaimRewards from "./ClaimRewards";
import { formatAddressShort } from "../lib/formatAddressShort";
import { formatAddress } from "../lib/formatAddress";
import { formatTokenBalance } from "../lib/formatTokenBalance";
import { useAccountStakeData } from "../artifacts/useAccountStakeData";
import { useAccountRewardsData } from "../artifacts/useAccountRewardsData";
import { CONTRACT_STAKING_URL } from "../artifacts/constants";
import { SS58_PREFIX } from "../artifacts/constants";
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import { ApiContext } from "../context/ApiProvider";
import Image from "next/image";
import LuckyLogo from "../assets/lucky.svg";

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `content-block bg-[#191B1F] rounded-2xl px-8 py-8 min-w-[500px]`
};

const AccountInfos = () => {
  const { account } = useContext(AccountContext)
  const { network } = useContext(ApiContext)
  const address = formatAddress(account?.address,network)
  const stakeData = useAccountStakeData(address,network)
  const rewardsData = useAccountRewardsData(address,network)

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

  function StakeDatas() {
    let totalStake = undefined;
    let totalClaimed = undefined;
    let totalPending = undefined;
    if (account) {
      //console.log("stakeData",stakeData.isFetching)
      if (stakeData?.data?.accounts?.nodes[0]) {totalStake = formatTokenBalance(stakeData.data?.accounts.nodes[0].totalStake)}
      else {totalStake = 0}
      if (rewardsData?.data?.accounts?.nodes[0]) {
        totalClaimed = formatTokenBalance(rewardsData.data?.accounts.nodes[0].totalClaimed)
        totalPending = formatTokenBalance(rewardsData.data?.accounts.nodes[0].totalPending)
      }
      else { totalClaimed = 0; totalPending=0 }

      if (stakeData.isFetching){
        return <div className="flex items-center justify-center">
          <span>Loading... <Image className="inline" src={LuckyLogo} alt="Lucky" height={20} width={20} /></span>
        </div>
      }
      else if (totalStake!==0 || totalClaimed!==0 || totalPending!==0) {
        return <div>
        <div className="py-1"><span>Your stake: </span><span>{totalStake}</span></div>
        <div className="py-1"><span>Already claimed: </span><span>{totalClaimed}</span></div>
        <div className="py-1"><span>Pending: </span><span>{totalPending}</span><span className="pl-12 float-right"><ClaimRewards /></span></div>
      </div>
      }
      else {
        return <div className="flex items-center justify-center">
            <span>You don't have any stake or rewards yet on Lucky <Image className="inline" src={LuckyLogo} alt="Lucky" height={20} width={20} /></span>
        </div>
      }
      
    }
    else {
      return <div className="flex items-center justify-center">
        <span>Connect account to get Lucky <Image className="inline" src={LuckyLogo} alt="Lucky" height={20} width={20} /></span>
      </div>
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
          <div>
            <div className="py-1">
              <AccountAddr/>
            </div>
            <StakeDatas/>
          </div>
      </div>
    </div>
  );
};
export default AccountInfos;
