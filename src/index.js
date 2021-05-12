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

const client = new ApolloClient({
  uri: "https://localhost:5001/graphql/",
  //uri: "http://joseff-001-site1.ctempurl.com/graphql/",
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>{routes}</Router>
  </ApolloProvider>,
  document.getElementById("root")
);
