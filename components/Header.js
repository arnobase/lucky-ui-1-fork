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
  title: `col-span-3 sm:col-span-1 flex text-3xl text-white-700 text-center font-semibold  xs:min-w-full`,
  headwrapper: `grid grid-cols-3 p-4 `,
  buttonsContainer: `col-span-3 sm:col-span-2 flex justify-end items-center`,
}

function Header() {
  const { network } = useContext(ApiContext)
  const raffle_url = network === undefined ? "/astar" : "/"+network
  return (
    <div className={headerStyle.headwrapper}>
      <div className={headerStyle.title}>
        <a href={raffle_url}><ExportedImage className="mr-1" src={LuckyLogo} alt="Lucky" height={75} /></a>
      </div>
      {/*
      <div className="sm:col-span-8 md:col-span-3 gd:col-span-3 flex justify-end items-center"> 
        <a className="pr-8" href={raffle_url}>The Lucky Raffle</a>
        <a className="pr-8" href="/wallets">Wallet Overview</a> 
        <a className="pr-8" href="/wiki">Docs</a> 
      </div>
      */}
      <div className={headerStyle.buttonsContainer}>
        <NetworkSelect/>    
        <AccountSelect />
      </div>
    </div>
  );
}




export default Header;
