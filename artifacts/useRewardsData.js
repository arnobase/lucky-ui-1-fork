import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";

export const useRewardsData = (
    address = undefined
  ) => {
    if (address) {
      return useQuery(["rewardsdatas", address], () => {
        if (!address) return undefined;
        return request(
          QUERY_URL,
          gql`query {
            rewards(orderBy: ERA_DESC, filter : {accountId: {equalTo: "${address}"}}){
              nodes{ era, accountId, amount }
          }
          }`
        );
      });
    }
    else {
      return useQuery(["rewardsdatas", address], () => {
        return request(
          QUERY_URL,
          gql`query {
            rewards(last:10000,orderBy: ERA_DESC){
              nodes{ era, accountId, amount }
          }
          }`
        );
      });
    }
  };