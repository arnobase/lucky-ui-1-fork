import { useState, useContext, useEffect } from 'react';
import Header from "../../components/Header";
import { ApiContext } from '../../context/ApiProvider';
import { claimAllEras } from '../../controllers/claimController';

export async function getStaticPaths() {
  return {
    paths: [
      { params: { network: 'astar' } },
      { params: { network: 'shiden' } },
      { params: { network: 'shibuya' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { network: params.network } };
}

export default function Admin({ network }) {
  const [status, setStatus] = useState('');
  const { api, setNetwork } = useContext(ApiContext);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setNetwork(network);
  }, [network]);

  const handleClaimAllEras = async () => {
    if (!api) {
      setStatus('API not connected');
      return;
    }

    setIsProcessing(true);
    setStatus('Claiming all eras...');
    
    try {
      const result = await claimAllEras(api);
      setStatus(`Success: ${result.message}`);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Page - {network}</h1>
        <button
          onClick={handleClaimAllEras}
          disabled={isProcessing}
          className={`${
            isProcessing ? 'bg-gray-500' : 'bg-blue-500'
          } text-white px-4 py-2 rounded`}
        >
          {isProcessing ? 'Processing...' : 'Claim All Eras'}
        </button>
        <p className="mt-4">{status}</p>
      </div>
    </div>
  );
} 