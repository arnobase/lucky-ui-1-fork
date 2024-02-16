import * as polkadotCryptoUtils from "@polkadot/util-crypto";
import * as polkadotUtils from "@polkadot/util";

import { formatAddressShort } from "../lib/formatAddressShort";
import { formatAddress } from "../lib/formatAddress";
import { formatTokenBalance } from "../lib/formatTokenBalance";

import { SS58_PREFIX } from "../artifacts/constants";
import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { ApiContext } from "../context/ApiProvider";
import { ContractContext } from "../context/ContractProvider";

import BN from "bn.js";

const style = {
  wrapper: `flex items-center justify-center mt-14`,
  content: `md:w-[500px] content-block bg-[#191B1F] rounded-2xl px-8 py-8 `,
  inputext: `bg-[#191B1F] text-white px-2 py-0 w-full`
};

function CheckEvmAddress() {
    
  const {network} = useContext(ApiContext)
  const [addressType, setAddressType] = useState("H160");
  const [addressPrefix, setAddressPrefix] = useState(5);
  const [addressInput, setAddressInput] = useState()

  const evmToPlm = useCallback(() => {
    console.log("evmToPlm")
    if (
      addressInput &&
      addressType === "H160" &&
      polkadotCryptoUtils.isEthereumAddress(addressInput)
    ) {
      console.log("go")
      return polkadotCryptoUtils.evmToAddress(addressInput, 42);
    } else {
      return "invalid";
    }
  }, [addressInput, addressPrefix, addressType]);

  const resultAddress = useMemo(() => {
   return evmToPlm();
  }, [evmToPlm]);
  
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.content}>
          <p>Input address</p>
          <input
            className={style.inputext}
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
          ></input>
          <p>{addressInput}</p>
          <p>{resultAddress}</p>
        </div>
      </div>
    </>
  );
};
export default CheckEvmAddress;
