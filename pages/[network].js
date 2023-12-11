import { useRouter } from 'next/router';
import Header from "../components/Header";
import Footer from "../components/Footer"
import RafleHistory from "../components/RafleHistory";
import AccountInfos from "../components/AccoutInfos";
import { Toaster } from 'react-hot-toast';
import EraCountdown from "../components/EraCountdown";
import { ApiContext } from '../context/ApiProvider';
import { useEffect, useContext, useState } from 'react';


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
  console.log("params----",params)
  //const router = useRouter();
  const { setNetwork } = useContext(ApiContext)
  const [queryNetwork,setQueryNetwork]=useState()


  useEffect(()=>{
    setNetwork(params.network)
    setQueryNetwork(params.network)
  },[params])

  const DisplayRaffleHistory = () => {
    if (queryNetwork) return <RafleHistory queryNetwork={queryNetwork} />
  }
  const DisplayEraCountdown = () => {
    if (queryNetwork) return <EraCountdown />
  }

  return (
    <div>
      <Toaster/>
      <Header />
      <DisplayEraCountdown />
      <AccountInfos />
      <DisplayRaffleHistory />
      {/*<Footer />*/}
    </div>
  );
}
