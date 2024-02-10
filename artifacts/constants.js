export const DAPP_NAME = "Lucky";

export const SS58_PREFIX = {
  astar:5,
  shiden:5,
  shibuya:5,
  substrate:42,
  rococo:42,
  westend:42,
  polkadot:0,
  kusama:2
};

export const CONTRACT_PALLET_NETWORK = {
  //astar: "polkadot",
  astar: "substrate",
  //shiden: "kusama",
  shiden: "westend",
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
  shibuya:  "https://portal.astar.network/shibuya-testnet/dapp-staking/dapp?dapp=xz3shvmrgry3mt3qq3sjz3aupqtfhkj4rkeoqm6vjrend3w",
  shiden:   "https://portal.astar.network/shiden/dapp-staking/dapp?dapp=x6ykus6l6ch4eozitzsyjscxh2agk2ky9g6a2xeu1w9fftp",
  astar:    "https://portal.astar.network/astar/dapp-staking/dapp?dapp=zsv1gvepvmwfdshmwgczs4zyvmmwesbjwqjn4wdpuefrrpy"
};

export const QUERY_URL = {
  shibuya:    "https://query.substrate.fi/lucky-subquery-shibuya",
  shiden:    "https://query.substrate.fi/lucky-subquery-shiden",
  astar:    "https://query.substrate.fi/lucky-subquery-astar"
};

export const REWARD_MANAGER_CONTRACT_ADDRESS = {
  //shibuya:  'WDtNnQgygsCXKfjdvL5TgimewWhcBhJgSSCkb5u5pzZJTpR',
  shibuya:  "X8nqJsFQWBk137WxetcPdAGLwnJ8xpAQ5tXS1bNsHKaz1q6",
  shiden:   'X6yBHZm9MGzedCVBn6nGHHUDxEnjUNzSoN4aqAP4qooQpEU',
  astar:    'ZSV1GVepvmWFdshMWgczS4zYvmmwEsBjWQjN4WDpUEFRRPy'
};

// pas utilisé pour le moment, sauf si on affiche le total stake (currentEraStake) 
export const DAPP_STAKING_APPLICATION_CONTRACT_ADDRESS = {
  shibuya:  'Xz3sHvmRgRY3mt3qQ3SjZ3aUPQTfHkj4rKeoQM6VJrenD3W',
  shiden:   'X6ykUS6L6CH4EoZitZsYJsCxH2AGk2ky9G6a2xeu1W9ffTP', 
  astar:    'ZSV1GVepvmWFdshMWgczS4zYvmmwEsBjWQjN4WDpUEFRRPy'
};

import reward_manager_metadata_shibuya from "./reward_manager_metadata_shibuya.json";
import reward_manager_metadata from "./reward_manager_metadata.json";
import reward_manager_metadata_astar from "./reward_manager_metadata_astar.json"
export const REWARD_MANAGER_CONTRACT_ABI_METADATA = {
  shibuya:  reward_manager_metadata_shibuya,
  shiden:   reward_manager_metadata,
  astar:    reward_manager_metadata_astar
};