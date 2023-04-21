import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";
import { formatAddress } from "../lib/formatAddress";

export const useAccountStakeData = (
    address,
    network
  ) => {
    return useQuery(["accountstakedatas", address], () => {
      if (!(address&&network)) return null;
      const address_stake = formatAddress(address,network);
      return request(
        QUERY_URL,
        gql`
        query Accounts {
            accounts(filter : {or: [
              {id:{equalTo: "${address_stake}"}},
            ]})
            {
              nodes{
                id,
                totalStake
              }
            } 
        }`
      );
    });
  };