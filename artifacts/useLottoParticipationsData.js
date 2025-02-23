import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { QUERY_URL } from "./constants";
import { formatAddress } from "../lib/formatAddress";

export const useLottoParticipationsData = (
    raffle,
    account,
    network,
    offset = 0,
    first = 100
) => {
    // Construction du filtre
    const filterRaffle = raffle ? `drawNumber: {equalTo: "${raffle}"}` : "";
    
    console.log('Input account:', account);
    console.log('Network:', network);
    
    let formattedSubstrateAddress = '';
    try {
      formattedSubstrateAddress = account ? formatAddress(account, "substrate") : '';
      console.log('Formatted substrate address:', formattedSubstrateAddress);
    } catch (error) {
      console.log('Error formatting address:', error);
    }
    
    // Construction du filtre pour le compte
    let filterAccount = '';
    if (account) {
      if (account.startsWith('0x')) {
        // Pour les adresses EVM, on utilise like pour une recherche partielle
        filterAccount = `
          accountId: {
            like: "%${account}%"
          }
        `;
      } else {
        try {
          // Pour les adresses Substrate, on essaie de les encoder d'abord
          const encodedAddress = formatAddress(account, "substrate");
          filterAccount = `
            accountId: {
              equalTo: "${encodedAddress}"
            }
          `;
        } catch (error) {
          // Si l'encodage échoue, on ne filtre pas
          console.log('Invalid substrate address format:', error);
          filterAccount = '';
        }
      }
    }

    const filterParts = [filterRaffle, filterAccount].filter(Boolean);
    const filter = filterParts.length ? `filter: {${filterParts.length > 1 ? 'and: {' : ''}${filterParts.join(',')}${filterParts.length > 1 ? '}' : ''}}` : '';

    console.log('Generated filter:', filter);

    return useQuery(["lottoparticipationsdatas", network, offset, first, raffle, account], () => {
      if (!network) return null;
      
      const query = gql`
        query GetParticipations($offset: Int!, $first: Int!) {
          participations(
            orderBy: [TIMESTAMP_DESC]
            first: $first
            offset: $offset
            ${filter}
          ) {
            nodes {
              id
              drawNumber
              accountId
              numbers
              chain
              timestamp
              __typename
            }
            totalCount
            __typename
          }
        }`;

      console.log('Full GraphQL query:', query);
      
      return request(QUERY_URL["lotto_" + network], query, { offset, first })
        .then(response => {
          console.log('GraphQL response:', response);
          return response;
        })
        .catch(error => {
          console.error('GraphQL error:', error);
          throw error;
        });
    });
};

/*
  query {

    participations{nodes{numRaffle, accountId, numbers}}
  
    results{nodes{numRaffle, numbers}}
  
    winners{nodes{numRaffle, accountId}}
  
  }
  */
