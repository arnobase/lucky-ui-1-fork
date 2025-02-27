import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";

export const useAccountStakeByPeriodData = (
    address,
    network,
    period
  ) => {
    return useQuery(["accountstakebyperiod"+address], () => {
      if (!(address&&network&&period)) return null;
      return request(
        QUERY_URL[network],
        gql`
        query {
          stakes(filter: {and: [ {accountId: {equalTo: "`+address+`"}}, {period: {equalTo: "`+period+`"}} ] } )
          { 
            aggregates{sum{amount}}
          }
        }`
      );
    });
  };

  export const useAccountStakeByPeriodDataAll = (
    address,
    network,
    period
  ) => {
    return useQuery(["accountstakebyperiodall"+address], () => {
      if (!(address&&network&&period)) return null;
      return request(
        QUERY_URL[network],
        gql`
        query {
          stakes(filter: {and: [ {accountId: {equalTo: "`+address+`"}}, {period: {equalTo: "`+period+`"}} ] } )
          { 
            nodes{amount}
          }
        }`
      );
    });
  };
