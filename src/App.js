import React from 'react';
import {ApolloProvider,Query} from 'react-apollo';
import {client} from './graphql/apollo.config'
import { GET_BOATS } from './graphql/GET_BOATS';
import { Card } from './components/card';

export const App = () => <ApolloProvider
  client={client}
>
  <div>
    <Query query={GET_BOATS}>
      {
        ({ loading, error, data }) => {
          if (error) {
            return <div>Error fetching data</div>
          }
          else if (loading) {
            return <div>Loading</div>
          }
          else {
            return data && data.getBoats && data.getBoats.map(boat => {
              const imageUrl = boat.imageUrl;
              const text = { ...boat };

              delete text.imageUrl;

              return boat.active && <Card
                key={boat.id}
                text={text}
                imageUrl={imageUrl}
              />
            })
          }
        }
      }
    </Query>
</div>
</ApolloProvider>
