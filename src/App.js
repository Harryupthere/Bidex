import "./assets/css/plugins/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "./App.css";
import { ethers } from "ethers";
import Router from "./Router/routes";
import { Web3ReactProvider } from "@web3-react/core";
import "antd/dist/antd.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_API } from "./config/constant/url";
import React, { useEffect } from "react";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        nfts: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
   uri: "https://bidex-nft-harsh.onrender.com" + "/graphql",
  //uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  function getLibrary(provider) {
    const library = new ethers.providers.Web3Provider(provider);
    console.log(library);
    library.pollingInterval = 12000; // frequency provider is polling
    return library;
  }

  return (
    <ApolloProvider client={client}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <div className="App overflow-hidden">
          <Router />
        </div>
      </Web3ReactProvider>
    </ApolloProvider>
  );
}

export default App;
