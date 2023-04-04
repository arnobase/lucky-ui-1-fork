import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";
import { formatAddress } from "../lib/formatAddress";

export const useAccountData = (
    address
  ) => {
    return useQuery(["accountdatas", address], () => {
      if (!address) return null;
      const address_5 = formatAddress(address,"shibuya");
      const address_42 = formatAddress(address,"rococo");
      return request(
        QUERY_URL,
        gql`
        query Accounts {
            accounts(filter : {or: [
              {id:{equalTo: "${address_5}"}},
              {id:{equalTo: "${address_42}"}}
            ]})
            {
              nodes{
                id,
                totalStake, 
                totalRewards, 
                totalPending, 
                totalClaimed
              }
            } 
        }`
      );
    });
  };