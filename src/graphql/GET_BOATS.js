import gql from "graphql-tag";

export const GET_BOATS = gql`
    {
        getBoats {
            id
            name
            type
            year
            reviews {
                total
                score
            }
            marina
            locality
            country
            skipper
            active
            cabins
            guests
            length
            price
            imageUrl
        }
    }
`