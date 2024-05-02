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

  return (<div className='pt-8 w-100'>
    <div className='m-auto w-96'>
      <h3 className='text-xl py-3'>Participation list</h3>
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
      <table>
        <thead>
          <tr><td>Raffle</td><td>Account</td><td>Numbers</td></tr>
        </thead>
        <tbody>
          {participationsData?.data?.participations?.nodes.map(participation=>(
            <tr key={participation.id}>
              <td className='w-20 text-center'>{participation.numRaffle}</td>
              <td className='w-40'>{formatAddressShort(participation.accountId,SS58_PREFIX[network])}</td>
              <td className='w-40'>{participation.numbers.join(",")}</td>
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