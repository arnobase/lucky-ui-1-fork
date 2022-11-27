import React, { useContext } from "react";
import Image from "next/image";
import { AiOutlineDown } from "react-icons/ai";
import Shiden from "../assets/Shiden.png";
import { ConnectContext } from "../context/ConnectProvider";
import dynamic from "next/dynamic";

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
  const { connectWallet, currentAccount, api } = useContext(ConnectContext);
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
        {currentAccount ? (
          <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={style.buttonIconContainer}>
              <Identicon
                value={currentAccount.address}
                size={20}
                theme={"polkadot"}
              />
            </div>

            <div className={style.buttonTextContainer}>
              {currentAccount.meta.name}
            </div>
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${style.button} ${style.buttonPadding}`}
          >
            <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
              Connect Wallet
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
