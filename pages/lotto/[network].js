
import Header from "../../components/Header";
import { Toaster } from 'react-hot-toast';
import { ApiContext } from '../../context/ApiProvider';
import { useEffect, useContext, useState, useRef } from 'react';
import LottoParticipationList from '../../components/LottoParticipationList';
import LottoParticipateAction from '../../components/LottoParticipateAction';
import LottoResults from '../../components/LottoResults';
import LottoHeader from '../../components/LottoHeader';
import LottoIntro from "../../components/LottoIntro";
import LottoFooter from "../../components/LottoFooter";

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
  const [selectedTab,setSelectedTab] = useState()

  const tabs = []
  tabs.push(useRef())
  tabs.push(useRef())

  useEffect(()=>{
    setNetwork(params.network)
  },[params])

  useEffect(()=>{
    const tab_hash = window.location.hash !== "" ? window.location.hash.substring(1) : "participate"
    setSelectedTab(tab_hash)
  },[])

  return (
    <div>
      <Toaster/>
      <Header />
      
      <div className={`flex items-center justify-center mt-14`}>
        <div className="md:w-[600px] content-block bg-[#191B1F] rounded-2xl px-2 py-8">
          <LottoIntro/>
        </div>
      </div>
      <div className={`flex items-center justify-center mt-14`}>
        <div className="md:w-[600px] content-block bg-[#191B1F] rounded-2xl px-8 py-8">
          <LottoHeader/>
          <ul className="mb-8 text-sm font-medium text-center rounded-lg shadow flex divide-gray-700 text-gray-400">
            <li className="w-full focus-within:z-10">
              <a href="#participate" key="1" id="lotto-tab-participate" onClick={(e)=>{setSelectedTab("participate")}} className={(selectedTab==="participate"?"bg-slate-600 ":"")+"inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-500 dark:border-gray-700 rounded-s-lg active focus:outline-none bg-gray-700 text-white"} aria-current="page">Participate</a>
            </li>
            <li className="w-full focus-within:z-10">
              <a href="#results" key="2" id="lotto-tab-results" onClick={(e)=>{setSelectedTab("results")}} className={(selectedTab==="results"?"bg-slate-600 ":"")+"inline-block w-full p-4 text-gray-900 bg-gray-100 dark:border-gray-700 rounded-e-lg focus:outline-none bg-gray-700 text-white"}>Results</a>
            </li>
          </ul>
          <div id="lotto-participate" ref={tabs[0]} className={selectedTab==="participate"?"":"hidden"}>
            <LottoParticipateAction />
            <LottoParticipationList/>
          </div>
          <div id="lotto-results" ref={tabs[1]} className={selectedTab==="results"?"":"hidden"}>
          <LottoResults/>
          </div>
        </div>
      </div>
      <div className={`flex items-center justify-center mt-14`}>
        <div className="md:w-[800px]  rounded-2xl px-2 py-8 mb-8">
          <LottoFooter/>
        </div>
      </div>
    </div>
  );
}





