import { ApiContext } from '../context/ApiProvider';
import { useContext, useEffect } from 'react';
import { useLottoParticipationsData } from '../artifacts/useLottoParticipationsData';
import { SS58_PREFIX } from "../artifacts/constants";
import { formatAddressShort } from "../lib/formatAddressShort";

const LottoParticipationList = () => {
  const {network} = useContext(ApiContext)
  const participationsData = useLottoParticipationsData(network)
 
  return (<div className='pt-8 w-100'>
    <div className='m-auto w-64'>
      <h3 className='text-xl py-3'>Participation list</h3>
      <ul>
        {participationsData?.data?.participations?.nodes.map(participation=>(
          <li>{participation.numRaffle + " - " + formatAddressShort(participation.accountId,SS58_PREFIX[network]) + " - " + participation.numbers.join(",")}</li>
        ))}
      </ul>
    </div>
  </div>);
  
};
export default LottoParticipationList;
