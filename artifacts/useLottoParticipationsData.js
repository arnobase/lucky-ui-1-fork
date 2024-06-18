
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";
import { formatAddress } from "../lib/formatAddress";

export const useLottoParticipationsData = (
    raffle,
    account,
    network
  ) => {
    /* {and:{
    	numRaffle:{equalTo:"2"},
    	accountId:{equalTo:"5CJGoLVukE26Z7cdbj49wZmLeZn2vr8t54M8zxjwNN6hV8Lw"}
    }},
    */
    const filterRaffle=raffle?"numRaffle:{equalTo:\""+raffle+"\"},":""
    const filterAccount=account?"accountId:{equalTo:\""+formatAddress(account,"substrate")+"\"},":""
    const filter = (filterRaffle || filterAccount) ? "filter:{and:{"+filterRaffle+filterAccount+"}},":""

    console.log("AN",filter)
    return useQuery(["lottoparticipationsdatas"+network], () => {
      if (!(network)) return null;
      //console.log("address_contract",address_contract)
      return request(
        QUERY_URL["lotto_"+network],
        gql`
        query Lottoparticipationsdatas {
          participations(${filter}orderBy:[ID_DESC]){
            nodes{
              id
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
