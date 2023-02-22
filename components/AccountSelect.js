import Image from "next/image"
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import { WalletSelect } from '@talismn/connect-components';
import { DAPP_NAME } from "../artifacts/constants.js";

const headerStyle={
  button: `flex items-center  bg-[#191B1F] hover:bg-[#333437] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2 pr-5`,
  buttonIconContainer: `flex items-center justify-center p-2`,
}

const AccountSelect = ( () => {

  const { account, setAccount } = useContext(AccountContext);
  const defaultAccount = {name:"Connect",wallet:{logo:{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJsb2dpbl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBpZD0iWE1MSURfMjFfIiBkPSJNMzAuOSA4MC4yYzAgMS4zIDEuNSAxLjkgMi41IDEuMWwzMi45LTMwLjJjLjMtLjMuNS0uNy41LTEuMSAwLS40LS4yLS44LS41LTEuMWwtMzMtMzAuMmMtLjktLjktMi41LS4yLTIuNSAxLjF2MTguMUgxMi4xYy0xLjEgMC0yLjEuOS0yLjEgMi4xdjIwLjFjMCAxLjEuOSAyLjEgMi4xIDIuMWgxOC44djE4eiIgZmlsbD0iI0VFRUVFRSIvPjxnPjxwYXRoIGQ9Ik03NiA4Mi4zSDU3LjFjLTIuNyAwLTQuOS0yLjItNC45LTQuOXMyLjItNC45IDQuOS00LjlINzZjMi4zIDAgNC4zLTEuOSA0LjMtNC4zVjMxLjZjMC0yLjMtMS45LTQuMy00LjMtNC4zSDU3LjFjLTIuNyAwLTQuOS0yLjItNC45LTQuOXMyLjItNC45IDQuOS00LjlINzZjNy43IDAgMTQgNi4zIDE0IDE0djM2LjdjMCA3LjktNi4zIDE0LjEtMTQgMTQuMXoiIGZpbGw9IiNFRUVFRUUiLz48L2c+PC9zdmc+Cg=="}}}
  const activeAccount = (account !== undefined && account !== null) ? account : defaultAccount;

  return <WalletSelect
        onlyShowInstalled
        dappName={DAPP_NAME}
        showAccountsList={true}
        triggerComponent={<div className={`${headerStyle.button} ${headerStyle.buttonPadding}`}>
          <div className={headerStyle.buttonIconContainer}>
            <Image src={activeAccount.wallet.logo.src} height={20} width={20} />
          </div>
          <button>{activeAccount.name}</button>
          </div>
        } 
        onAccountSelected={(account) => { setAccount(account)}}
      />
})

export default AccountSelect