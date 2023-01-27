import React, { useContext, useState } from "react";
import Image from "next/image";
import { AiOutlineDown } from "react-icons/ai";
import Shiden from "../assets/Shiden.png";
const DAPP_NAME = "Lucky";
import { WalletSelect } from '@talismn/connect-components';
import dynamic from "next/dynamic";
import accountProvider from "../context/account";

const style = {
  title: "text-4xl text-white-700 text-center font-semibold",
  headwrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  network: `mr-2`,
};

function Header() {
  const [activeAccount, setActiveAccount] = useState({name:"Connect"})
  const Identicon = dynamic(() => import("@polkadot/react-identicon"), {
    ssr: false,
  });
  return (
    <div className={style.headwrapper}>
      <div className={style.title}>Lucky</div>
      <div className={style.buttonsContainer}>
        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={style.buttonIconContainer}>
            <Image src={Shiden} alt="shiden" height={20} width={20} />
          </div>
          <p className={style.network}>Shibuya</p>
        </div>
        <WalletSelect 
          onlyShowInstalled
          dappName={DAPP_NAME}
          showAccountsList={true}
          triggerComponent={
            <button>{activeAccount.name}</button>
          } 
          onAccountSelected={(account) => { console.log(account); accountProvider.setCurrent(account); setActiveAccount(account)}}// }}
        />
      </div>
    </div>
  );
}

export default Header;
