import { ApiContext } from '../context/ApiProvider';
import { useContext, useEffect, useState } from 'react';
import { useLottoResultsData } from '../artifacts/useLottoResultsData';
import { useLottoWinnersData } from '../artifacts/useLottoWinnersData';
import { SS58_PREFIX } from "../artifacts/constants";
import { formatAddressShort } from "../lib/formatAddressShort";
import { LottoContractContext } from "../context/LottoContractProvider";

const LottoHeader = () => {
  const [raffleIdRes,setRaffleIdRes]=useState()
  const { lottoContract,doGetCurrentRaffleIdDryRun } = useContext(LottoContractContext)

  useEffect(()=>{
    const doQuery = async () => {
      const res = await doGetCurrentRaffleIdDryRun()
      setRaffleIdRes(res.resultToHuman.Ok.Ok)
    }
    if (lottoContract) doQuery()
  },[lottoContract])

  const {network} = useContext(ApiContext)
  
  console.log("raffleIdRes.result",raffleIdRes)
  return (<>
    <div className="w-100 text-center pb-6 text-xl">Current Raffle: {raffleIdRes}</div>
  </>);
  
};
export default LottoHeader;
