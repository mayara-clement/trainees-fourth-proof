import {  gql } from '@apollo/client'


export const GET_REGIONALIZATION = gql`
  query GET_PRODUCTS($input: SendRegionalizationInput!) {
    storeRegionalization(input: $input) {
      name
      address
      neighborhood
      city
      state
      postalCode
      hour
      products {
        id
        image
        name
        listPrice
        price
        installments
      }
    }
  }
`