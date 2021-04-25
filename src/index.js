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
import { Router } from "react-router";
import { routes } from "./router/routes";
import { shouldInclude } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    return graphqlErrors.map(({ message, location, path }) => {
      alert(`GraphQL error ${message}`);
    });
  }
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
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
  credentials: shouldInclude,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>{routes}</Router>
  </ApolloProvider>,
  document.getElementById("root")
);
