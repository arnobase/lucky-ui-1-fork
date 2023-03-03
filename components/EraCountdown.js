import React from "react";
import { useContext } from "react";
import { EraEtaContext } from "../context/EraEtaProvider";

const EraCountdown = (props) => {

  function EtaDisplay(props) {
    return <div className="flex items-center justify-center">
        <span>{props.eraeta}</span>
    </div>
  }
  const { eraeta } = useContext(EraEtaContext);
  if (eraeta !== undefined) {
    return <div className={`w-screen flex items-center justify-center mt-14`}>
      <div className="bg-[#191B1F] rounded-2xl px-8 py-8 ">
        <div className="flex items-center justify-center text-lg" >Next Era ETA:&nbsp;<EtaDisplay eraeta={eraeta}/></div>
        <span></span>
      </div>
    </div>;
  }
};
export default EraCountdown;