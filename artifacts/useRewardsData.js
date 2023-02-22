import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";

export const useRewardsData = (
    address
  ) => {
    return useQuery(["rewardsdatas", address], () => {
      if (!address) return null;
      return request(
        QUERY_URL,
        gql`query {
          rewards(orderBy: ERA_DESC, filter : {accountId: {equalTo: "${address}"}}){
            nodes{ era, accountId, amount }
         }
        }`
      );
    });
  };