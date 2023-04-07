export const DAPP_NAME = "Lucky";

export const SS58_PREFIX = {
  astar:5,
  shiden:5,
  shibuya:5,
  rococo:42,
  westend:42,
  polkadot:0,
  kusama:2
};

export const CONTRACT_PALLET_NETWORK = {
  astar: "polkadot",
  shiden: "kusama",
  shibuya: "rococo"
}

export const NETWORK_TOKENS = {
  astar:"ASTR",
  shiden:"SDN",
  shibuya:"SBY"
}

export const TOKEN_DECIMALS = {
  ASTR: 18,
  SDN: 18,
  SBY: 18
};

export const PROVIDER_ENDPOINTS = {
  astar:"wss://rpc.astar.network",
  shiden:"wss://shiden.api.onfinality.io/public-ws",
  shibuya:"wss://rpc.shibuya.astar.network"
}

export const CONTRACT_STAKING_URL = {
  shibuya: "https://portal.astar.network/shibuya-testnet/dapp-staking/dapp?dapp=xz3shvmrgry3mt3qq3sjz3aupqtfhkj4rkeoqm6vjrend3w"
}

//export const QUERY_URL = "https://api.subquery.network/sq/GuiGou12358/lucky---shibuya"
export const QUERY_URL = "https://api.subquery.network/sq/GuiGou12358/lucky-shibuya-v0_1_0"

//export const REWARD_MANAGER_CONTRACT_ADDRESS = "W66fXdDBkcp7RkZmsS7qLLpjdHB4FDSqWgJArbvCYG3PQ48";
export const REWARD_MANAGER_CONTRACT_ADDRESS = "WDtNnQgygsCXKfjdvL5TgimewWhcBhJgSSCkb5u5pzZJTpR";

import reward_manager_metadata from "./reward_manager_metadata.json"
export const REWARD_MANAGER_CONTRACT_ABI_METADATA = reward_manager_metadata