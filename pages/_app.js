import "../styles/globals.scss";
import Context from "../context/Context";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <Toaster />
      <Component {...pageProps} />
    </Context>
  );
}

export default MyApp;
