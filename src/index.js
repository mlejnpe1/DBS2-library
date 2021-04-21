import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home/Home';
import './index.css';
import {onError} from '@apollo/client/link/error';
import {ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache} from '@apollo/client';

const errorLink = onError(({graphqlErrors, networkError}) => {
    if (graphqlErrors) {
      graphqlErrors.map(({message,location,path}) => {alert(`GraphQL error ${message}`);});
    }
  });
  
  const link = from([
    errorLink,
    new HttpLink({uri:"https://localhost:5001/graphql/"}),
  ]);
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

ReactDOM.render(
    <ApolloProvider client={client}>
        <Home />
    </ApolloProvider>,document.getElementById('root')
);
