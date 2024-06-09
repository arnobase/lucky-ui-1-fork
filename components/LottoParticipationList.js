import { ApiContext } from '../context/ApiProvider';
import { useContext, useEffect, useState } from 'react';
import { useLottoParticipationsData } from '../artifacts/useLottoParticipationsData';
import { SS58_PREFIX } from "../artifacts/constants";
import { formatAddressShort } from "../lib/formatAddressShort";

const LottoParticipationList = () => {
  const {network} = useContext(ApiContext)
  const [raffleFilter,setRaffleFilter]=useState()
  const [accountFilter,setAccountFilter]=useState()
  const participationsData = useLottoParticipationsData(raffleFilter,accountFilter,network)
 
  useEffect(()=>{
    participationsData.refetch()
  },[raffleFilter,accountFilter])

  return (<div className='pt-8 w-100 bg-[#191B1F] pt-6 pb-6 mt-8 rounded-xl'>
    <div className='m-auto w-96'>
      <h3 className='text-xl py-3'>📜 Participation list</h3>
      <input
          className="bg-[#191B1F] ring-grey focus:ring-[rgba(116,190,100,1)] focus:border-[rgba(116,190,100,1)] text-white px-2 py-1 mb-3 w-full rounded-lg"
          type="text"
          placeholder="Filter by Raffle"
          value={raffleFilter}
          onChange={(e) => setRaffleFilter(e.target.value)}
      />
      <input
          className="bg-[#191B1F] ring-grey focus:ring-[rgba(116,190,100,1)] focus:border-[rgba(116,190,100,1)] text-white px-2 py-1 mb-3 w-full rounded-lg"
          type="text"
          placeholder="Filter by Account"
          value={accountFilter}
          onChange={(e) => setAccountFilter(e.target.value)}
      />
      <table className='w-full'>
        <thead>
          <tr className='flex w-full'>
            <td className='w-1/5'>Raffle</td>
            <td className='w-2/5'>Account</td>
            <td className='w-2/5'>Numbers</td>
          </tr>
        </thead>
        
        <tbody className='flex flex-col overflow-y-scroll w-full h-[400px]'>
        
          {participationsData?.data?.participations?.nodes.map(participation=>(
            <tr className='flex w-full' key={participation.id}>
              <td className='w-1/5 text-center'>{participation.numRaffle}</td>
              <td className='w-2/5'>{formatAddressShort(participation.accountId,SS58_PREFIX[network])}</td>
              <td className='w-2/5'>{participation.numbers.join(",")}</td>
            </tr>
          ))}
    
        </tbody>
        
      </table>

    </div>
  </div>);
  
};
export default LottoParticipationList;

/*
      <ul>
        {participationsData?.data?.participations?.nodes.map(participation=>(
          <li key={participation.id}>{participation.numRaffle + " - " + formatAddressShort(participation.accountId,SS58_PREFIX[network]) + " - " + participation.numbers.join(",")}</li>
        ))}
      </ul>*/