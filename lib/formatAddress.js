import { SS58_PREFIX } from "../artifacts/constants";
import { encodeAddress } from "@polkadot/util-crypto";

//const network = "shibuya"

export const formatAddress = (
  address,
  network
) => {
    if (!address) return undefined
    const prefix = SS58_PREFIX[network]
    let formatted
    try {
      formatted = encodeAddress(address, prefix);
    } catch (error) {
      console.log("use full address")
    }
    
    return `${formatted}`;
};