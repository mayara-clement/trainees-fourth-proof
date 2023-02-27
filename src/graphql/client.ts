import {  ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://trainees-fourth-proof-igode.ondigitalocean.app/graphql",
  cache: new InMemoryCache({
    resultCaching: false,
  }),
});

export default client;


