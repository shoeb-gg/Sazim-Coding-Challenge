import { gql } from '@apollo/client/core'
import apolloClient from '../apollo'
import router from '@/router'
import { nextTick } from 'vue'

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

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(credentials: { email: $email, password: $password }) {
      success
      access_token
    }
  }
`

export const getUserById = (id: string) => {
  return apolloClient.query({
    query: GET_USER,
    variables: { id },
  })
}
export const loginQuery = (email: string, password: string) => {
  return apolloClient.query({
    query: LOGIN,
    variables: { email, password },
  })
}

export const loginSuccess = async (token: string) => {
  localStorage.setItem('access_token', token)
  await nextTick()

  router.push('/products/my')
}

export const handleLogOut = async () => {
  localStorage.clear()
  await nextTick()

  router.push('/login')
}
