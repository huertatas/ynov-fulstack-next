import "../styles/globals.scss";
import Layout from "../components/layout/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client/apollo-client";
import Context from "../context/Context";
import { Toaster } from "react-hot-toast";

// import { loadStripe } from "@stripe/stripe-js";

// import { Elements } from "@stripe/react-stripe-js";

// export const stripePromise = loadStripe(
//   "pk_test_51KHlqyAw1gIXHZCzDqsbPPbFIw0pOGB5qOwjJEKGK6U48K2pVggB4eOoDpBk936flMAF6OYZ0J27J8fjkccCJYu800KV1pgGx2"
// );

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Context>
        <Toaster />
        <Component {...pageProps} />
      </Context>
    </ApolloProvider>
  );
}

export default MyApp;
