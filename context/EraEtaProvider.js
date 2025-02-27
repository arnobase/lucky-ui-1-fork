import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DateTime } from 'luxon';
import { ApiContext } from "./ApiProvider";
import { usePalletInfosData } from "../artifacts/usePalletInfosData";

export const EraEtaContext = React.createContext();

export const EraEtaProvider = ({ children }) => {
  
  const [eraeta, setEraEta] = useState(undefined);
  const [period, setPeriod] = useState(undefined);
  const [subPeriod, setSubPeriod] = useState(undefined)
  const [countdown, setCountdown] = useState(undefined);
  const { network } = useContext(ApiContext)
  const palletInfos = usePalletInfosData(network)

  useEffect(()=>{
    if (palletInfos) {
      if (palletInfos?.data?.palletInfos?.nodes[0]) {
        setPeriod(palletInfos?.data?.palletInfos?.nodes[0].currentPeriod)
        setSubPeriod(palletInfos?.data?.palletInfos?.nodes[0].currentSubPeriod)
      }
    }
  },[palletInfos])

  /*
  useEffect(()=>{
    updateEta()
  },[network])
  
  useEffect(()=>{
    if (countdown===0) updateEta()
  },[countdown])
  */


  let varCountdown;
  useEffect(()=>{
    let interval
    if(countdown) {
      varCountdown = Math.floor(countdown)
      setCountdown(varCountdown)
      interval = setInterval(() => {
        varCountdown = varCountdown>0 ? varCountdown-1 : 0
        setCountdown(varCountdown)
      }, 1000);
    }
    return () => clearInterval(interval);
  },[eraeta])

  /*
  const updateEta = () => {

    const zone = DateTime.local().zoneName
    let dateTime = DateTime.fromObject({},{
      zone,
    });
    
    if (network) {
      axios.get("https://api.astar.network/api/v1/"+network+"/dapps-staking/stats/nexteraeta").then((response) => {
        const dataCountdown = response.data
        //const dataCountdown = 10
        setCountdown(dataCountdown)
        const etaNextEra = dateTime
          .plus(response.data * 1000)
        setEraEta(etaNextEra);
      }).catch((err) => {console.log(err)});
    }
    
  }
  */

  return (
    <EraEtaContext.Provider
      value={{
        eraeta,
        period,
        subPeriod,
        countdown,
        //updateEta
      }}
    >
      {children}
    </EraEtaContext.Provider>
  );
};