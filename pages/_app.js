import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiProvider } from "../context/ApiProvider";
import { AccountProvider } from "../context/AccountProvider";
import { EraEtaProvider } from "../context/EraEtaProvider";
import { ContractProvider } from "../context/ContractProvider";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ApiProvider>
      <ContractProvider>
        <AccountProvider>
          <QueryClientProvider client={queryClient}>
            <EraEtaProvider>
              <Component {...pageProps} />
            </EraEtaProvider>
          </QueryClientProvider>
        </AccountProvider>
      </ContractProvider>
    </ApiProvider>
  );
}

export default MyApp;
