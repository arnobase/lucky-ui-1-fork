import "../styles/globals.css";
import { ApiProvider } from "../context/ApiProvider";
import { AccountProvider } from "../context/AccountProvider";
import { EraEtaProvider } from "../context/EraEtaProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ApiProvider>
      <AccountProvider>
        <QueryClientProvider client={queryClient}>
          <EraEtaProvider>
            <Component {...pageProps} />
          </EraEtaProvider>
        </QueryClientProvider>
      </AccountProvider>
    </ApiProvider>
  );
}

export default MyApp;
