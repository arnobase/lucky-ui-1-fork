import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";

export const useLottoParticipationsData = (
    network
  ) => {
    //console.log("AN",address,network)
    return useQuery(["lottoparticipationsdatas"+network], () => {
      if (!(network)) return null;
      //console.log("address_contract",address_contract)
      return request(
        QUERY_URL["lotto_"+network],
        gql`
        query Lottoparticipationsdatas {
          participations(orderBy:[NUM_RAFFLE_ASC,ACCOUNT_ID_ASC]){
            nodes{
              numRaffle,
              accountId,
              numbers
            }
          }
        }`
      );
    });
  };

/*
  query {

    participations{nodes{numRaffle, accountId, numbers}}
  
    results{nodes{numRaffle, numbers}}
  
    winners{nodes{numRaffle, accountId}}
  
  }
  */