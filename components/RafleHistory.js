import React from "react";
import styles from '../styles/Home.module.css';
import { useRewardsData } from "../artifacts/useRewardsData";
import { formatAddress } from "../lib/formatAddress";
import { formatAddressShort } from "../lib/formatAddressShort";
import { formatTokenBalance } from "../lib/formatTokenBalance";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../context/AccountProvider";
import { ApiContext } from "../context/ApiProvider"
import { SS58_PREFIX } from "../artifacts/constants";
import Image from "next/image";
import LuckyLogo from "../assets/lucky.svg";

const RafleHistory = () => {

  const [querydata,setQueryData] = useState();
  const { account } = useContext(AccountContext);
  const { data } = useRewardsData();
  const { network } = useContext(ApiContext)

  useEffect(()=>{
    setQueryData(data);
  },[data])

  if (querydata?.rewards?.nodes) {
      const elements = querydata.rewards.nodes;
      return <div className={`flex items-center justify-center mt-14`}>
        <div className="md:w-[500px] content-block bg-[#191B1F] rounded-2xl px-8 py-8 ">
          <div className="flex items-center justify-center text-xl pb-3" ><h2>Raffle history</h2></div>
          <div className="max-h-96 overflow-auto scrollbar-thumb-gray-900 scrollbar-track-gray-700"><RaffleElements elements={elements}/></div>
        </div>
      </div>;
  }

  function RaffleElements(props) {
    if (props.elements?.length !== 0) {
    return <div className="reward-list grid justify-center">      
      {props.elements.map(reward=>(
        <div className="reward-item win-w-[300px]" key={"era"+reward.era}>Era <span>{reward.era}</span>: <span>{formatAddressShort(reward.accountId,SS58_PREFIX[network])}</span> wins <span>{formatTokenBalance(reward.amount)}</span></div>
      ))}
    </div>
    }
    else {
      return <div className="flex items-center justify-center">
          <span>Nothing here yet...<Image className="inline" src={LuckyLogo} alt="Lucky" height={20} width={20} /></span>
      </div>
    }
  }

};
export default RafleHistory;