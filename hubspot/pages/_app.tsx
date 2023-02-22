import { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/index.scss";
import "@agility/plenum-ui/lib/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
