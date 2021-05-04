import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { history } from "./services/history";
import "./assets/Cards.css";
import { Router } from "react-router";
import { routes } from "./router/routes";
import { shouldInclude } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && typeof graphQLErrors !== "undefined")
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = from([
  errorLink,
  new HttpLink({
    uri: "http://joseff-001-site1.ctempurl.com/graphql/",
    // uri: "https://localhost:44307/graphql/"
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authLink.concat(link)]),
  credentials: "include",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>{routes}</Router>
  </ApolloProvider>,
  document.getElementById("root")
);
