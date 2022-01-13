import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client/apollo-client";
import Context from "../context/Context";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Context>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </Context>
    </ApolloProvider>
  );
}

export default MyApp;
