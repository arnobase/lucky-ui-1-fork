import { SS58_PREFIX } from "../artifacts/constants";
import { encodeAddress } from "@polkadot/util-crypto";
import { ApiContext } from "../context/ApiProvider";
import { useContext } from "react";

//const network = "shibuya"

export const formatAddress = (
  address,
  prefix
) => {
    const { network } = useContext(ApiContext)
    if(typeof prefix === "undefined") prefix = SS58_PREFIX[network]
    const formatted = encodeAddress(address, prefix);
    return `${formatted}`;
};