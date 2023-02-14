import React, { useContext, useState, useRef } from "react";
import Image from "next/image";
import { AiOutlineDown } from "react-icons/ai";
import Shiden from "../assets/Shiden.png";
import LuckyLogo from "../assets/lucky.svg";
const DAPP_NAME = "Lucky";
import { WalletSelect, web3FromSource, WalletSelectButton } from '@talismn/connect-components';
import dynamic from "next/dynamic";
//import accountProvider from "../context/account";
import { AccountContext } from "../context/AccountProvider";

const style = {
  title: "text-4xl text-white-700 text-center font-semibold flex",
  headwrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  network: `mr-2`,
};

function Header(refBtConnect) {

  const { account, setAccount } = useContext(AccountContext);
  console.log("ACOUNT---------",account)
  function selectAccount(walletAccount) {
    //console.log("set account: "+JSON.stringify(walletAccount)); 
    //accountProvider.setCurrent(account); 
    setAccount(walletAccount)
    //setActiveAccount(walletAccount)
  }

  const defaultAccount = {name:"Connect",wallet:{logo:{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJsb2dpbl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBpZD0iWE1MSURfMjFfIiBkPSJNMzAuOSA4MC4yYzAgMS4zIDEuNSAxLjkgMi41IDEuMWwzMi45LTMwLjJjLjMtLjMuNS0uNy41LTEuMSAwLS40LS4yLS44LS41LTEuMWwtMzMtMzAuMmMtLjktLjktMi41LS4yLTIuNSAxLjF2MTguMUgxMi4xYy0xLjEgMC0yLjEuOS0yLjEgMi4xdjIwLjFjMCAxLjEuOSAyLjEgMi4xIDIuMWgxOC44djE4eiIgZmlsbD0iI0VFRUVFRSIvPjxnPjxwYXRoIGQ9Ik03NiA4Mi4zSDU3LjFjLTIuNyAwLTQuOS0yLjItNC45LTQuOXMyLjItNC45IDQuOS00LjlINzZjMi4zIDAgNC4zLTEuOSA0LjMtNC4zVjMxLjZjMC0yLjMtMS45LTQuMy00LjMtNC4zSDU3LjFjLTIuNyAwLTQuOS0yLjItNC45LTQuOXMyLjItNC45IDQuOS00LjlINzZjNy43IDAgMTQgNi4zIDE0IDE0djM2LjdjMCA3LjktNi4zIDE0LjEtMTQgMTQuMXoiIGZpbGw9IiNFRUVFRUUiLz48L2c+PC9zdmc+Cg=="}}}
  const activeAccount = account !== undefined ? account : defaultAccount;
  const Identicon = dynamic(() => import("@polkadot/react-identicon"), {
    ssr: false,
  });
  return (
    <div className={style.headwrapper}>
      <div className={style.title}><Image className="mr-1" src={LuckyLogo} alt="Lucky" height={40} width={40} /><span>Lucky</span></div>
      <div className={style.buttonsContainer}>
        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={style.buttonIconContainer}>
            <Image src={Shiden} alt="shiden" height={20} width={20} />
          </div>
          <p className={style.network}>Shibuya</p>
        </div>
        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={style.buttonIconContainer}>
          <Image src={activeAccount.wallet.logo.src} height={20} width={20} />
          </div>
          <WalletSelect
          ref={refBtConnect}
          onlyShowInstalled
          dappName={DAPP_NAME}
          showAccountsList={true}
          triggerComponent={
            <button>{activeAccount.name}</button>
          } 
          onAccountSelected={(account) => { selectAccount(account)}}
        />
        </div>
        
        
        
      </div>
    </div>
  );
}

export default Header;
