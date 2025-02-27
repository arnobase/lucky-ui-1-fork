import { ApiContext } from '../context/ApiProvider';
import { useContext, useEffect, useState } from 'react';
import { useLottoParticipationsData } from '../artifacts/useLottoParticipationsData';
import { SS58_PREFIX } from "../artifacts/constants";
import { formatAddressShort } from "../lib/formatAddressShort";

const ITEMS_PER_PAGE = 20;

const LottoParticipationList = () => {
  const {network} = useContext(ApiContext)
  const [raffleFilter,setRaffleFilter]=useState()
  const [accountFilter,setAccountFilter]=useState()
  const [currentPage, setCurrentPage] = useState(0);
  
  const participationsData = useLottoParticipationsData(
    raffleFilter,
    accountFilter,
    network,
    currentPage * ITEMS_PER_PAGE,
    ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil((participationsData?.data?.participations?.totalCount || 0) / ITEMS_PER_PAGE);

  useEffect(()=>{
    setCurrentPage(0); // Reset to first page when filters change
    participationsData.refetch()
  },[raffleFilter,accountFilter])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    participationsData.refetch();
  };

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
              <td className='w-1/5 text-center'>{participation.drawNumber}</td>
              <td className='w-2/5'>{formatAddressShort(participation.accountId, SS58_PREFIX[network])}</td>
              <td className='w-2/5'>{participation.numbers.join(",")}</td>
            </tr>
          ))}
    
        </tbody>
        
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 rounded-lg bg-[#2C2F36] disabled:opacity-50"
        >
          Previous
        </button>
        
        <span className="text-sm">
          Page {currentPage + 1} of {totalPages || 1}
        </span>
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 rounded-lg bg-[#2C2F36] disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="text-sm text-center mt-2 text-gray-400">
        Total entries: {participationsData?.data?.participations?.totalCount || 0}
      </div>
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