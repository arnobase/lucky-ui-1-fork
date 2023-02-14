import React from "react";
import styles from '../styles/Home.module.css';

const address="5CJG...V8Lw"

const RafleHistory = (props) => {
  return <div className={`w-screen flex items-center justify-center mt-14`}>
    <div className="bg-[#191B1F] rounded-2xl px-8 py-8 ">
      <div className="flex items-center justify-center text-lg" ><h2>Raffle history</h2></div>
      <div><ul className="text-sm">
        <li>Era <span>2491</span>: <span>{address}</span> wins <span>0.2 SBY</span></li>
        <li>Era <span>2490</span>: <span>{address}</span> wins <span>0.2 SBY</span></li>
        <li>Era <span>2489</span>: <span>{address}</span> wins <span>0.2 SBY</span></li>
        <li>Era <span>2488</span>: <span>{address}</span> wins <span>0.2 SBY</span></li>
        <li>Era <span>2487</span>: <span>{address}</span> wins <span>0.2 SBY</span></li>
        <li>Era <span>2486</span>: <span>{address}</span> wins <span>0.2 SBY</span></li>
      </ul></div>
    </div>
  </div>;
};
export default RafleHistory;