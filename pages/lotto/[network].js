import { useRouter } from 'next/router';
import Header from "../../components/Header";
import Footer from "../../components/Footer"

import { Toaster } from 'react-hot-toast';
import { ApiContext } from '../../context/ApiProvider';
import { LottoContractContext, doParticipateDryRun, participateDryRunRes } from "../../context/LottoContractProvider";
import { useEffect, useContext, useState, useRef } from 'react';
import LottoParticipationList from '../../components/LottoParticipationList';
import LottoParticipateAction from '../../components/LottoParticipateAction';


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
  // Fetch necessary data for the page using params.network
  const network = params.network;
  // Pass data to the page via props
  return { props: { network } };
}




export default function Home(params) {
  
  const { setNetwork } = useContext(ApiContext)
  const [finalNumbers,setFinalNumbers] = useState([])
  const [stateNumbersOk,setStateNumbersOk] = useState(false)


  useEffect(()=>{
    setNetwork(params.network)
  },[params])

  return (
    <div>
      <Toaster/>
      <Header />
      <LottoParticipateAction />
      {/*<Footer />*/}
      <LottoParticipationList />
    </div>
  );
}





