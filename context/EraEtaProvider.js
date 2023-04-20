import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from 'luxon';

export const EraEtaContext = React.createContext();

export const EraEtaProvider = ({ children }) => {
  
  const [eraeta, setEraEta] = useState(undefined);
  const [countdown, setCountdown] = useState(undefined);

  useEffect(()=>{
    updateEta()
  },[])

  useEffect(()=>{
    if (countdown===0) updateEta()
  },[countdown])
  
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

  const updateEta = () => {

    const zone = DateTime.local().zoneName
    console.log("zone",zone)
    let dateTime = DateTime.fromObject({},{
      zone,
    });
    
    console.log("dateTime",dateTime)

    axios.get("https://api.astar.network/api/v1/shibuya/dapps-staking/stats/nexteraeta").then((response) => {
      const dataCountdown = response.data
      //const dataCountdown = 10
      setCountdown(dataCountdown)
      console.log("response",dataCountdown)
      const etaNextEra = dateTime
        .plus(response.data * 1000)
      setEraEta(etaNextEra);
    });
  }

  return (
    <EraEtaContext.Provider
      value={{
        eraeta,
        countdown,
        updateEta
      }}
    >
      {children}
    </EraEtaContext.Provider>
  );
};