import { gql } from '@apollo/client/core'
import apolloClient from '../apollo'
import type { PRODUCT } from '@/models/Products.DTO'
import { nextTick } from 'vue'
import router from '@/router'

export const CreateProduct = gql`
  mutation CreateProduct($productData: PRODUCT_Input!) {
    createProduct(productData: $productData) {
      id
      title
      categories
      description
      purchasePrice
      rentPrice
      rentDuration
    }
  }
`
const UpdateProduct = gql`
  mutation UpdateProduct($productData: PRODUCT_Input_Update!) {
    updateProduct(productData: $productData) {
      id
      title
      categories
      description
      purchasePrice
      rentPrice
      rentDuration
    }
  }
`

export const DeleteProduct = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`
export const GetProductById = gql`
  query getProductById($id: String!) {
    getProductById(id: $id) {
      id
      title
      categories
      description
      purchasePrice
      rentPrice
      rentDuration
    }
  }
`
export const GetProductForUser = gql`
  query getProductForUser {
    getProductForUser {
      id
      title
      categories
      description
      purchasePrice
      rentPrice
      rentDuration
    }
  }
`

export const GetAllProducts = gql`
  query getAllProducts {
    getAllProducts {
      id
      title
      categories
      description
      purchasePrice
      rentPrice
      rentDuration
    }
  }
`
export const updateProduct = (productData: PRODUCT | undefined) => {
  return apolloClient.mutate({
    mutation: UpdateProduct,
    variables: {
      productData: {
        ...productData,
      },
    },

    update: (cache, { data: { productData } }) => {
      cache.writeQuery({
        query: GetProductById,
        variables: { id: productData.id },
        data: { getProductById: productData },
      })
    },
  })
}

export const getProductById = (productId: string) => {
  return apolloClient.query({
    query: GetProductById,
    variables: {
      id: productId,
    },
  })
}
export const getProductForUser = () => {
  return apolloClient.query({
    query: GetProductForUser,
  })
}

export const CreateNewProductSuccess = async () => {
  await nextTick()
  router.push('/products/my')
}

export const refreshProducts = async () => {
  return await apolloClient.query({
    query: GetProductForUser,
    fetchPolicy: 'network-only', // Skip cache, get fresh data
  })
}
