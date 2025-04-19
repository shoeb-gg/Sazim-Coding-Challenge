import { gql } from '@apollo/client/core'
import apolloClient from '../apollo'

const GET_USER = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      id
      email
      firstName
      lastName
    }
  }
`

export const getUserById = (id: string) => {
  return apolloClient.query({
    query: GET_USER,
    variables: { id },
  })
}
