import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DateTime } from 'luxon';
import { ApiContext } from "./ApiProvider";

export const EraEtaContext = React.createContext();

export const EraEtaProvider = ({ children }) => {
  
  const [eraeta, setEraEta] = useState(undefined);
  const [countdown, setCountdown] = useState(undefined);
  const { network } = useContext(ApiContext)

  useEffect(()=>{
    updateEta()
  },[network])

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