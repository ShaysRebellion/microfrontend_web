import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: '/graphql', // Proxy calls to localhost:3001 (see proxy field in package.json)
  cache: new InMemoryCache({
    typePolicies: {
      ExchangeRate: {
         // Generate Apollo client id for cache/update cache purposes
         // https://www.apollographql.com/docs/react/caching/cache-configuration/
        keyFields: ["exchangeRateType"]
      }
    }
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
