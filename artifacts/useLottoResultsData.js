import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";

export const useLottoResultsData = (
    network
  ) => {
    //console.log("AN",address,network)
    return useQuery(["LottoResultsDatas"+network], () => {
      if (!(network)) return null;
      //console.log("address_contract",address_contract)
      return request(
        QUERY_URL["lotto_"+network],
        gql`
        query results {
          results(orderBy:NUM_RAFFLE_DESC){
            nodes{
              id,
              numRaffle,
              numbers
            }
          }
        }
        `
      );
    });
  };
