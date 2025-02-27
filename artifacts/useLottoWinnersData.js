import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";

export const useLottoWinnersData = (
    network
  ) => {
    //console.log("AN",address,network)
    return useQuery(["lottoWinnersDatas"+network], () => {
      if (!(network)) return null;
      //console.log("address_contract",address_contract)
      return request(
        QUERY_URL["lotto_"+network],
        gql`
        query winners {
          winners(orderBy:NUM_RAFFLE_DESC){
            nodes{
              id,
              numRaffle,
              accountId
            }
          }
        }`
      );
    });
  };
