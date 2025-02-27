import 'flowbite';
import "../styles/globals.css";
import "../styles/markdown.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiProvider } from "../context/ApiProvider";
import { AccountProvider } from "../context/AccountProvider";
import { EraEtaProvider } from "../context/EraEtaProvider";
import { ContractProvider } from "../context/ContractProvider";
import { LottoContractProvider } from "../context/LottoContractProvider";
import { useState, useEffect } from 'react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, router }) {
  const [queryNetwork, setQueryNetwork] = useState()

  useEffect(()=>{
    setQueryNetwork(["shiden","shibuya","astar"].includes(router.query.network) ? router.query.network : undefined)
  },[router])
  
  return (
    <ApiProvider queryNetwork={queryNetwork}>
      <AccountProvider>
        <ContractProvider>
          <LottoContractProvider>
            <QueryClientProvider client={queryClient}>
              <EraEtaProvider>
                <Component {...pageProps} />
              </EraEtaProvider>
            </QueryClientProvider>
          </LottoContractProvider>
        </ContractProvider>
      </AccountProvider>
    </ApiProvider>
  );
}

export default MyApp;
