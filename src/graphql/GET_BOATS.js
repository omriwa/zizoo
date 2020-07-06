import gql from "graphql-tag";

export const GET_BOATS = gql`
    {
        getBoats {
            id
            name
        }
    }
`