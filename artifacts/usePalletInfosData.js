import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";

export const usePalletInfosData = (
    network
  ) => {
    return useQuery(["accountpendingdatas"+network], () => {
      if (!(network)) return null;
      return request(
        QUERY_URL[network],
        gql`
        query {
          palletInfos {
            nodes { 
              currentEra, currentPeriod, currentSubPeriod 
            } 
          }
        }`
      );
    });
  };
