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
  query Login($credentials: LOGIN!) {
    login(credentials: $credentials) {
      success
      access_token
    }
  }
`

export const CreateUser = gql`
  mutation CreateUser($userInfo: CREATE_USER_INPUT!) {
    createUser(userInfo: $userInfo) {
      id
      firstName
      lastName
      email
      phone
      address
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
    variables: {
      credentials: {
        email: email,
        password: password,
      },
    },
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

export const goToAllProducts = async () => {
  await nextTick()

  router.push('/products/all')
}

export const goToMyProducts = async () => {
  await nextTick()

  router.push('/products/my')
}

export const SignUpSuccess = async () => {
  await nextTick()

  router.push('/login')
}
