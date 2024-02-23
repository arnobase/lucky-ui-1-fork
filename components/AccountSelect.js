import Image from "next/image"
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import { WalletSelect } from '@talismn/connect-components';
import { DAPP_NAME } from "../artifacts/constants.js";
import ExportedImage from "next-image-export-optimizer";

const headerStyle={
  button: `max-h[50px] flex items-center content-block bg-[#191B1F] hover:bg-[#333437] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonIconContainer: `flex items-center justify-center p-2`,
}

const AccountSelect = ( () => {

  const { account, setAccount, refWallet } = useContext(AccountContext);
  const defaultAccount = {name:"Connect",wallet:{logo:{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJsb2dpbl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBpZD0iWE1MSURfMjFfIiBkPSJNMzAuOSA4MC4yYzAgMS4zIDEuNSAxLjkgMi41IDEuMWwzMi45LTMwLjJjLjMtLjMuNS0uNy41LTEuMSAwLS40LS4yLS44LS41LTEuMWwtMzMtMzAuMmMtLjktLjktMi41LS4yLTIuNSAxLjF2MTguMUgxMi4xYy0xLjEgMC0yLjEuOS0yLjEgMi4xdjIwLjFjMCAxLjEuOSAyLjEgMi4xIDIuMWgxOC44djE4eiIgZmlsbD0iI0VFRUVFRSIvPjxnPjxwYXRoIGQ9Ik03NiA4Mi4zSDU3LjFjLTIuNyAwLTQuOS0yLjItNC45LTQuOXMyLjItNC45IDQuOS00LjlINzZjMi4zIDAgNC4zLTEuOSA0LjMtNC4zVjMxLjZjMC0yLjMtMS45LTQuMy00LjMtNC4zSDU3LjFjLTIuNyAwLTQuOS0yLjItNC45LTQuOXMyLjItNC45IDQuOS00LjlINzZjNy43IDAgMTQgNi4zIDE0IDE0djM2LjdjMCA3LjktNi4zIDE0LjEtMTQgMTQuMXoiIGZpbGw9IiNFRUVFRUUiLz48L2c+PC9zdmc+Cg=="}}}
  const activeAccount = (account !== undefined && account !== null) ? account : defaultAccount;

  const Logout = () => {
    if (account) return <div className={`${headerStyle.button} ${headerStyle.buttonPadding}`}>
    <div className={headerStyle.buttonIconContainer} onClick={()=>{setAccount(undefined)}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 500 500">
        <path fill="#EEEEEE" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
      </svg>
    </div>
  </div>
  }

  return <>
    <WalletSelect
          
          onlyShowInstalled
          dappName={DAPP_NAME}
          showAccountsList={true}
          triggerComponent={<div className={`${headerStyle.button} ${headerStyle.buttonPadding} pr-4`}>
            <div className={headerStyle.buttonIconContainer}>
              <ExportedImage alt="account" src={activeAccount?.wallet?.logo.src} height={20} width={20} />
            </div>
            <button ref={refWallet}>{activeAccount.name}</button>
            </div>
          } 
          onAccountSelected={(account) => { setAccount(account)}}
    />
    <Logout />
  </>
})

export default AccountSelect