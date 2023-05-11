import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";

export const useRewardsData = (
    address = undefined,
    network
  ) => {
    if (address) {
      return useQuery(["rewardsdatas", address], () => {
        if (!address) return null;
        return request(
          QUERY_URL[network],
          gql`query {
            rewards(first:10000,orderBy: ERA_DESC, filter : {accountId: {equalTo: "${address}"}}){
              nodes{ era, accountId, amount }
          }
          }`
        );
      });
    }
    else {
      return useQuery(["rewardsdatas"], () => {
        return request(
          QUERY_URL[network],
          gql`query {
            rewards(first:10000,orderBy: ERA_DESC){
              nodes{ era, accountId, amount }
          }
          }`
        );
      });
    }
  };