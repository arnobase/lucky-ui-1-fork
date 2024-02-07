import React from "react";
import Image from "next/image";
//import LuckyLogo from "../assets/lucky.svg";
import LuckyLogo from "../assets/logo-slogan-bg-noir-grand.png";
import NetworkSelect from "./NetworkSelect";
import AccountSelect from "./AccountSelect.js";
import ExportedImage from "next-image-export-optimizer";
import { ApiContext } from "../context/ApiProvider.js";
import { useContext } from "react";

const headerStyle= {
  title: ``,
  //headwrapper: `p-4 w-screen flex justify-between items-center`,
  headwrapper: ``,
  buttonsContainer: ``,
  buttonsContainerStart: `col-span-3 sm:col-span-2 flex justify-start items-center`,
  
  button: `max-h[50px] flex items-center content-block bg-[#191B1F] hover:bg-[#333437] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonIconContainer: `flex items-center justify-center p-2`,
}

function Header() {
  const { network } = useContext(ApiContext)
  const raffle_url = network === undefined ? "/astar" : "/"+network
  return (
    <div className="grid grid-cols-6 p-4">
      <div className="sm:col-span-2 flex text-3xl text-white-700 text-center font-semibold  xs:min-w-full">
        <a href={raffle_url}><ExportedImage className="mr-1" src={LuckyLogo} alt="Lucky" height={75} /></a>
      </div>
      <div className="sm:col-span-4 flex justify-end items-center">  
        <a href={raffle_url}>The Lucky Raffle</a> 
        <NetworkSelect/>    
        <AccountSelect />
      </div>
    </div>
  );
}

export default Header;
