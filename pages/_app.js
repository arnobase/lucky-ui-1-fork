import "../styles/globals.css";
import { ConnectProvider } from "../context/ConnectProvider";
function MyApp({ Component, pageProps }) {
  return (
    <ConnectProvider>
      <Component {...pageProps} />
    </ConnectProvider>
  );
}

export default MyApp;
