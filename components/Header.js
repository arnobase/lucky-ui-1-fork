import React from "react";
import Image from "next/image";
import LuckyLogo from "../assets/lucky.svg";
import NetworkSelect from "./NetworkSelect";
import AccountSelect from "./AccountSelect.js";

const headerStyle= {
  title: `col-span-3 sm:col-span-1 flex text-3xl text-white-700 text-center font-semibold  xs:min-w-full`,
  //headwrapper: `p-4 w-screen flex justify-between items-center`,
  headwrapper: `grid grid-cols-3 p-4 `,
  buttonsContainer: `col-span-3 sm:col-span-2 flex justify-end items-center`,
}

function Header() {
  return (
    <div className={headerStyle.headwrapper}>
      <div className={headerStyle.title}>
        <Image className="mr-1" src={LuckyLogo} alt="Lucky" height={40} width={40} /><span className="leading-loose">Lucky</span>
      </div>
      <div className={headerStyle.buttonsContainer}>   
        <NetworkSelect/>    
        <AccountSelect />
      </div>
    </div>
  );
}

export default Header;
