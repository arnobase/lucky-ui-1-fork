import { ApiContext } from "../context/ApiProvider";
import { useContext } from "react";
const { formatBalance } = require('@polkadot/util');
import { NETWORK_TOKENS, TOKEN_DECIMALS } from "../artifacts/constants";

export const formatTokenBalance = (value) => {
    const { network } = useContext(ApiContext)
    const unit = NETWORK_TOKENS[network]
    const decimals = TOKEN_DECIMALS[unit]
    formatBalance.setDefaults({unit: unit,decimals: decimals});
    try {
        const formated = formatBalance(
            value,
            { 
                withSiFull: true, 
                withSi: true,
                forceUnit: unit
            }
        );
        return formated
    } catch (error) {
        console.log(error)
        return value
    }
    
    
}