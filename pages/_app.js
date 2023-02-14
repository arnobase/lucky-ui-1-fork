import "../styles/globals.css";
import { ApiProvider } from "../context/ApiProvider";
import { AccountProvider } from "../context/AccountProvider";
function MyApp({ Component, pageProps }) {
  return (
    <ApiProvider>
      <AccountProvider>
        <Component {...pageProps} />
      </AccountProvider>
    </ApiProvider>
  );
}

export default MyApp;
