import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token')

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getProductById: {
          keyArgs: ['id'],
        },
        getProductForUser: {
          keyArgs: [],
        },
      },
    },
  },
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first', // Use cache first by default, fetch from network only if needed
      errorPolicy: 'all',
    },
    watchQuery: {
      fetchPolicy: 'cache-and-network', // For reactive queries, this will update UI from cache first, then refresh from network
      errorPolicy: 'all',
    },
  },
})

export default apolloClient
