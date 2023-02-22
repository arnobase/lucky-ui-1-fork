import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";

export const useAccountData = (
    address
  ) => {
    return useQuery(["accountdatas", address], () => {
      if (!address) return null;
      return request(
        QUERY_URL,
        gql`
        query Accounts {
            accounts(filter : {id: {equalTo: "${address}"}}){
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