import { ApiContext } from '../context/ApiProvider';
import { useContext, useEffect } from 'react';
import { useLottoResultsData } from '../artifacts/useLottoResultsData';
import { useLottoWinnersData } from '../artifacts/useLottoWinnersData';
import { SS58_PREFIX } from "../artifacts/constants";
import { formatAddressShort } from "../lib/formatAddressShort";

const LottoParticipationList = () => {
  const {network} = useContext(ApiContext)
  const resultsData = useLottoResultsData(network)
  const winnersData = useLottoWinnersData(network)
 
  return (<>
  <div className='pt-8 w-100'>
    <div className='m-auto w-64'>
      <h3 className='text-xl py-3'>Results</h3>
      <ul>
        {resultsData?.data?.results?.nodes.map(e=>(
          <li key={e.id}>{e.numRaffle + " - " + e.numbers}</li>
        ))}
      </ul>
    </div>
  </div>
  <div className='pt-8 w-100'>
    <div className='m-auto w-64'>
      <h3 className='text-xl py-3'>Winners</h3>
      <ul>
        {winnersData?.data?.winners?.nodes.map(e=>(
          <li key={e.id}>{e.numRaffle + " - " + formatAddressShort(e.accountId,SS58_PREFIX[network])}</li>
        ))}
      </ul>
    </div>
  </div>
  </>);
  
};
export default LottoParticipationList;
