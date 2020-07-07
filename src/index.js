import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { client } from './graphql/apollo.config'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider
      client={client}
    >
      <Router
        location='search'
      >
<Route
        path='/'
        exact
      >
        <Redirect
          from='/'
          to='/search'
        />
      </Route>
        <Route
          exact
          path='/search'
          component={App}
        />
        </Router>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
