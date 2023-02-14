import { useContext } from "react";
import ClaimRewards from "./ClaimRewards";
import { formatAddressShort } from "../lib/formatAddressShort";
import { formatAddress } from "../lib/formatAddress";
import { formatTokenBalance } from "../lib/formatTokenBalance";
import { useAccountData } from "../artifacts/useAccountData";
import { CONTRACT_STAKING_URL } from "../artifacts/constants";
import { AccountContext } from "../context/AccountProvider";
import { ApiContext } from "../context/ApiProvider";

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] rounded-2xl px-8 py-8 min-w-[500px]`
};

const address="5CJG...V8Lw"

const AccountInfos = () => {
 
  const { account } = useContext(AccountContext)
  const { network } = useContext(ApiContext)

  function AccountAddr() {
    if (account !== undefined) {
      const address = account.address
      return <>
        <span>Address: </span>
        <span>{formatAddressShort(address)}</span>&nbsp;
        <a 
          className="float-right font-medium underline"
          target="_blank"
          href={CONTRACT_STAKING_URL[network]}
          >Manage your stake
        </a>
      </>
    }
  }

  function StakeDatas() {
    if (account !== undefined) {
      const address = formatAddress(account.address)
      const { data } = useAccountData(address);
      if (
          data !== undefined 
          && data.accounts.nodes[0] !== undefined
        ) {
        const totalStake = formatTokenBalance(data.accounts.nodes[0].totalStake)
        const totalClaimed = formatTokenBalance(data.accounts.nodes[0].totalClaimed)
        const totalPending = formatTokenBalance(data.accounts.nodes[0].totalPending)
        return <div>
          <div className="py-1"><span>Your stake on Lucky: </span><span>{totalStake}</span></div>
          <div className="py-1"><span>You already Claimed </span><span>{totalClaimed}</span><span> on Lucky</span></div>
          <div className="py-1"><span>You have </span><span>{totalPending}</span><span> pending on Lucky</span><span className="pl-12 float-right"><ClaimRewards /></span></div>
        </div>
      }
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
