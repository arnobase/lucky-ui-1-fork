import "../styles/globals.css";
import "../styles/markdown.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiProvider } from "../context/ApiProvider";
import { AccountProvider } from "../context/AccountProvider";
import { EraEtaProvider } from "../context/EraEtaProvider";
import { ContractProvider } from "../context/ContractProvider";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ApiProvider>
      <AccountProvider>
        <ContractProvider>
          <QueryClientProvider client={queryClient}>
            <EraEtaProvider>
              <Component {...pageProps} />
            </EraEtaProvider>
          </QueryClientProvider>
        </ContractProvider>
      </AccountProvider>
    </ApiProvider>
  );
}

export default MyApp;
