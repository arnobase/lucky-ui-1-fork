import React from "react";
import Image from "next/image";
import styles from "../styles/styles.js"
import LuckyLogo from "../assets/lucky.svg";
import NetworkSelect from "./NetworkSelect";
import AccountSelect from "./AccountSelect.js";

const headerStyle= {
  title: `text-3xl text-white-700 text-center font-semibold flex`,
  headwrapper: `p-4 w-screen flex justify-between items-center`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
}

function Header() {
  return (
    <div className={headerStyle.headwrapper}>
      <div className={headerStyle.title}>
        <Image className="mr-1" src={LuckyLogo} alt="Lucky" height={40} width={40} /><span>Lucky</span>
      </div>
      <div className={headerStyle.buttonsContainer}>   
        <NetworkSelect/>    
        <AccountSelect />
      </div>
    </div>
  );
}

export default Header;
