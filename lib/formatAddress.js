import { SS58_PREFIX } from "../artifacts/constants";
import { encodeAddress } from "@polkadot/util-crypto";

//const network = "shibuya"

export const formatAddress = (
  address,
  network
) => {
    if (!address) return undefined
    const prefix = SS58_PREFIX[network]
    const formatted = encodeAddress(address, prefix);
    return `${formatted}`;
};