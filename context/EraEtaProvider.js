import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from 'luxon';

export const EraEtaContext = React.createContext();

export const EraEtaProvider = ({ children }) => {
  
  const [eraeta, setEraEta] = useState(undefined);

  useEffect(()=>{
    updateEta()
  },[])
  
  const updateEta = () => {
    axios.get("https://api.astar.network/api/v1/astar/dapps-staking/stats/nexteraeta").then((response) => {
    console.log("ERAETA",response.data)
    let etaNextEra = DateTime.local()
      .plus(response.data * 1000)
      .toFormat('HH:mm dd-MMM');
    
    /*
    let nextEraDate = DateTime.local().plus(response.data * 1000)
    let nowDate = DateTime.local()
    var diffInMonths = nextEraDate.diff(nowDate, 'seconds');
    console.log(diffInMonths.seconds)
    */
   
    setEraEta(etaNextEra);
    });
  }

  return (
    <EraEtaContext.Provider
      value={{
        eraeta,
        updateEta
      }}
    >
      {children}
    </EraEtaContext.Provider>
  );
};