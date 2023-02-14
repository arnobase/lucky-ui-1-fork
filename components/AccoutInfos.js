import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import ClaimRewards from "./ClaimRewards";
//import accountProvider from "../context/account";
import { formatAddressShort } from "../lib/formatAddressShort";

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`
};

const address="5CJG...V8Lw"

const AccountInfos = () => {
 
  const { account } = useContext(AccountContext)

  function AccountAddr() {
    if (account !== undefined) {
      const address = account.address
      return <>
        <span>Address: </span>
        <span>{formatAddressShort(address)}</span>
        <a 
          className="float-right font-medium underline" 
          href="https://portal.astar.network/#/shibuya-testnet/dapp-staking/discover">
          Manage your stake
        </a>
      </>
    }
  }

  return (
    <div className={style.wrapper}>
      <div className="bg-[#191B1F] rounded-2xl px-8 py-8">
          <div>
            <div className="py-1">
            <AccountAddr/>
            </div>
            <div className="py-1"><span>Your stake on Lucky: </span><span>30 SBY</span></div>
            <div className="py-1"><span>You already Claimed </span><span>2.3 SBY</span><span> on Lucky</span></div>
            <div className="py-1"><span>You have </span><span>0.5 SBY</span><span> pending on Lucky</span><span className="pl-12"><ClaimRewards /></span></div>
          </div>
      </div>
    </div>
  );
};
export default AccountInfos;
