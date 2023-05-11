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
};

export const NETWORK_TOKENS = {
  astar:"ASTR",
  shiden:"SDN",
  shibuya:"SBY"
};

export const TOKEN_DECIMALS = {
  ASTR: 18,
  SDN: 18,
  SBY: 18
};

export const PROVIDER_ENDPOINTS = {
  astar:"wss://rpc.astar.network",
  //shiden:"wss://shiden.api.onfinality.io/public-ws",
  shiden:"wss://shiden.api.onfinality.io/ws?apikey=53bc7e7e-1dbf-4272-af42-66c42a474c30",
  //shibuya:"wss://rpc.shibuya.astar.network",
  shibuya:"wss://shibuya-rpc.dwellir.com",
}

export const CONTRACT_STAKING_URL = {
  shibuya: "https://portal.astar.network/shibuya-testnet/dapp-staking/dapp?dapp=xz3shvmrgry3mt3qq3sjz3aupqtfhkj4rkeoqm6vjrend3w"
};

//export const QUERY_URL = "https://api.subquery.network/sq/GuiGou12358/lucky---shibuya"
export const QUERY_URL = {
  shibuya:  "https://api.subquery.network/sq/GuiGou12358/lucky-shibuya-v0_1_0",
  shiden:   "https://api.subquery.network/sq/GuiGou12358/lucky-shiden-v0_1_0"
};

//export const REWARD_MANAGER_CONTRACT_ADDRESS = "WDtNnQgygsCXKfjdvL5TgimewWhcBhJgSSCkb5u5pzZJTpR";
export const REWARD_MANAGER_CONTRACT_ADDRESS = {
  shibuya:  "WDtNnQgygsCXKfjdvL5TgimewWhcBhJgSSCkb5u5pzZJTpR",
  shiden:   'X6yBHZm9MGzedCVBn6nGHHUDxEnjUNzSoN4aqAP4qooQpEU'
};

//export const DAPP_STAKING_APPLICATION_CONTRACT_ADDRESS = 'Xz3sHvmRgRY3mt3qQ3SjZ3aUPQTfHkj4rKeoQM6VJrenD3W';
export const DAPP_STAKING_APPLICATION_CONTRACT_ADDRESS = {
  shibuya:  'Xz3sHvmRgRY3mt3qQ3SjZ3aUPQTfHkj4rKeoQM6VJrenD3W',
  shiden:   'Xz3sHvmRgRY3mt3qQ3SjZ3aUPQTfHkj4rKeoQM6VJrenD3W' // à remplacer
};

import reward_manager_metadata from "./reward_manager_metadata.json"
export const REWARD_MANAGER_CONTRACT_ABI_METADATA = {
  shibuya:  reward_manager_metadata,
  shiden:   reward_manager_metadata
};