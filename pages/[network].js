import { useRouter } from 'next/router';
import Header from "../components/Header";
import Footer from "../components/Footer"
import RafleHistory from "../components/RafleHistory";
import AccountInfos from "../components/AccoutInfos";
import { Toaster } from 'react-hot-toast';
import EraCountdown from "../components/EraCountdown";
import { ApiContext } from '../context/ApiProvider';
import { useEffect, useContext, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { setNetwork } = useContext(ApiContext)
  const [queryNetwork,setQueryNetwork]=useState()

  useEffect(()=>{
    setNetwork(router.query.network)
    setQueryNetwork(router.query.network)
  },[router])

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
