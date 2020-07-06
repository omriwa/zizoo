import React from 'react';
import {ApolloProvider,Query} from 'react-apollo';
import {client} from './graphql/apollo.config'
import { GET_BOATS } from './graphql/GET_BOATS';

export const App = () => <ApolloProvider
  client={client}
>
  <div>
    <Query query={GET_BOATS}>
      {
        ({ loading, error, data }) => {
          if (!error && !loading) {
            return data.getBoats.map(boat => <div>{boat.name}</div>)
          }
          else
            return <div>no data</div>
        }
      }
    </Query>
</div>
</ApolloProvider>
