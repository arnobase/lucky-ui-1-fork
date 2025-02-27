import { useState, useEffect, useContext } from "react";
import { ApiContext } from "../context/ApiProvider";
import { LOTTO_CONTRACT_ADDRESS } from "../artifacts/constants";
import { formatTokenBalance } from "../lib/formatTokenBalance";
import BN from "bn.js";

const LottoIntro = () => {

  const [lottoAstrRewards,setLottoAstrRewards] = useState(0)
  const { api, network } = useContext(ApiContext);
  const bn_18 = new BN(10).pow(new BN(18))

  useEffect(()=>{
    const doQuery = async () => {
      let { data: { free: _lottoAstrRewards } } = await api.query.system.account(LOTTO_CONTRACT_ADDRESS[network]);
      setLottoAstrRewards(BN(_lottoAstrRewards).div(bn_18))
      console.log("##@@##",_lottoAstrRewards)
    }
    if (api && network) doQuery()
  },[api, network])

  return (<>
 
    <div class="flex items-center justify-center">
      <div class="text-lg margin-auto text-center">
        <div class="text-2xl">The Lotto raffle is currently</div>
        <div class="text-2xl pb-2">💰 4M $PINK and {lottoAstrRewards.toString()} $ASTR 💰</div>
        <div>Pick 4 numbers and submit your participation (free to play).</div>
        <div>A draw is made every Tuesday</div>
        <div>If your numbers match the draw, you win!</div>
        <div>If there is no winner, the jackpot is put back into play </div>
      </div>
    </div>

  </>);
  
};
export default LottoIntro;
