import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";
import { formatAddress } from "../lib/formatAddress";

export const useAccountPendingData = (
    address,
    network
  ) => {
    return useQuery(["accountpendingdatas"+network], () => {
      if (!(address&&network)) return null;
      const addresses = address.map(a=>formatAddress(a.address,"substrate"))
      //console.log("addresses UseAccountPendingData",addresses)
      return request(
        QUERY_URL[network],
        gql`
          query {
            accounts(filter:{
              and:{
                totalPending:{greaterThan:"0"},
                id:{in:["`+addresses.join('","')+`"]}
              }
            }){
              nodes{
                id
                totalPending
              }
            }
          }`
      );
    });
  };

/*
# Write your query or mutation here
query {
  accounts(filter:{
    and:{
      totalPending:{notEqualTo:"0"},
      id:{in:["5FXqbwEzLBiFF8DaZh8yYp6AzhPU8ZnH78LbLgXXuukgsmWA","5DXQiwGCMYe9j3bVpRevhJBGaoAfYemEAyc5Wo24m4ioLvx7"]}
    }
  }){
    nodes{
      id
      totalPending
    }
  }
}

query {
          accounts(filter:{totalPending:{notEqualTo:"0"}}){
            nodes{
              id
              totalPending
            }
          }
        }

*/