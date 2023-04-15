import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL, CONTRACT_PALLET_NETWORK } from "./constants";
import { formatAddress } from "../lib/formatAddress";

export const useAccountRewardsData = (
    address,
    network
  ) => {
    //console.log("AN",address,network)
    return useQuery(["accountrewardsdatas", address], () => {
      if (!(address&&network)) return null;
      const address_contract = formatAddress(address,CONTRACT_PALLET_NETWORK[network]);
      //console.log("address_contract",address_contract)
      return request(
        QUERY_URL,
        gql`
        query Accounts {
            accounts(filter : {or: [
              {id:{equalTo: "${address_contract}"}}
            ]})
            {
              nodes{
                id,
                totalClaimed,
                totalPending
              }
            } 
        }`
      );
    });
  };