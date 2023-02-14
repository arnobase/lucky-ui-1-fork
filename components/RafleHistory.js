import React from "react";
import styles from '../styles/Home.module.css';
import { useRewardsData } from "../artifacts/useRewardsData";
import { formatAddress } from "../lib/formatAddress";
import { formatAddressShort } from "../lib/formatAddressShort";
import { formatTokenBalance } from "../lib/formatTokenBalance";
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";

const RafleHistory = (props) => {
  const { account } = useContext(AccountContext);
  if (account !== undefined) {
    const addressQuery = formatAddress(account.address,42);
    //const addressQuery = "5DaCixaPPaYrdGdSxP6Mwptn7dPNp3DTeJCQKuCUQe5jp6fL"
    const addressDisplay = formatAddress(account.address);
    console.log("42 ADDR:",addressQuery)
    console.log("ADDR:",addressDisplay)
    const { data } = useRewardsData(addressQuery);
    if (
      data !== undefined 
      && data.rewards.nodes !== undefined
    ) {
      const elements = data.rewards.nodes;
      return <div className={`w-screen flex items-center justify-center mt-14`}>
        <div className="bg-[#191B1F] rounded-2xl px-8 py-8 ">
          <div className="flex items-center justify-center text-lg" ><h2>Raffle history</h2></div>
          <div><ul className="text-sm">
            {elements.map(reward=>(
              <li>Era <span>{reward.era}</span>: <span>{formatAddressShort(addressDisplay)}</span> wins <span>{formatTokenBalance(reward.amount)}</span></li>
            ))}
          </ul></div>
        </div>
      </div>;
    }
  }
};
export default RafleHistory;