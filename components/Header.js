import React from "react";
import Image from "next/image";
//import LuckyLogo from "../assets/lucky.svg";
import LuckyLogo from "../assets/logo-slogan-bg-noir-grand.png";
import NetworkSelect from "./NetworkSelect";
import AccountSelect from "./AccountSelect.js";
import ExportedImage from "next-image-export-optimizer";

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
        <ExportedImage className="mr-1" src={LuckyLogo} alt="Lucky" height={75} />
      </div>
      <div className={headerStyle.buttonsContainer}>   
        <NetworkSelect/>    
        <AccountSelect />
      </div>
    </div>
  );
}

export default Header;
