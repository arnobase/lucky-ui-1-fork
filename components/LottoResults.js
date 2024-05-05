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
  <div className='pt-4 pb-6 w-100 bg-[#191B1F] mt-6 p rounded-2xl '>
    <div className='m-auto w-64 '>
      <h3 className='text-xl py-3'>📜 Results of all lotto draws</h3>  
      <table>
        <thead>
          <tr><td>Raffle</td><td>Numbers</td></tr>
        </thead>
        <tbody>
          {resultsData?.data?.results?.nodes.map(e=>(
            <tr key={e.id}>
              <td className='w-20 text-center'>{e.numRaffle}</td>
              <td className='w-40'>{String(e.numbers)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  <div className='pt-4 pb-6 w-100 bg-[#191B1F] mt-6 p rounded-2xl '>
    <div className='m-auto w-64'>
      <h3 className='text-xl py-3'>🏆 Winners list</h3>
      <table>
        <thead>
          <tr><td>Raffle</td><td>Account</td></tr>
        </thead>
        <tbody>
          {winnersData?.data?.winners?.nodes.map(e=>(
            <tr key={e.id}>
              <td className='w-20 text-center'>{e.numRaffle}</td>
              <td className='w-40'>{formatAddressShort(e.accountId,SS58_PREFIX[network])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </>);
  
};
export default LottoParticipationList;
