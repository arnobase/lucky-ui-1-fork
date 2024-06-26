import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { EraEtaContext } from "../context/EraEtaProvider";
import { ContractContext } from "../context/ContractProvider";

const EraCountdown = (props) => {

  const { eraeta, period, subPeriod, countdown } = useContext(EraEtaContext);
  const { currentEra } = useContext(ContractContext);
  
  function EtaDisplay(props) {
    if (props.eraeta !== undefined) {
    return <>
    Next Era:&nbsp;
    <div className="flex items-center justify-center">
        <span>{props.eraeta.toFormat('HH:mm dd-MMM')}</span>
    </div>
    </>
    }
  }

  function CountdownDisplay(props) {
    const distance = Math.floor(props.countdown)
    var hours = Math.floor((distance) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60)).toString().padStart(2,"0");
    var seconds = Math.floor((distance % (60))).toString().padStart(2,"0");
    if (distance) return <div className="countdown">
      <span className="countdown-hours">{hours}</span><span className="countdown-colon">:</span>
      <span className="countdown-minutes">{minutes}</span><span className="countdown-colon">:</span>
      <span className="countdown-seconds">{seconds}</span>
      </div>
  }

  return <div className={`flex items-center justify-center mt-14`}>
    <div className="era-display content-block bg-[#191B1F] rounded-2xl px-8 py-8 ">
      {(period) ? <div className="flex items-center justify-center text-lg" >Current period: {period}</div>:<></>}
      {(subPeriod) ? <div className="flex items-center justify-center text-2xl" >{subPeriod}</div>:<></>}
      <div className="flex items-center justify-center text-lg" >Current ERA: {currentEra}</div>
      {/*
      <div className="flex items-center justify-center text-lg" ><EtaDisplay eraeta={eraeta}/></div>
      <div className="flex items-center justify-center text-2xl" ><CountdownDisplay countdown={countdown}/></div>
      */}
      <span></span>
    </div>
  </div>;
  
};
export default EraCountdown;