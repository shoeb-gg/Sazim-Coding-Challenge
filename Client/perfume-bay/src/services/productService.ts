import { gql } from '@apollo/client/core'
import apolloClient from '../apollo'
import type { PRODUCT } from '@/models/Products.DTO'
import { nextTick } from 'vue'
import router from '@/router'

const CreateProduct = gql`
  mutation CreateProduct($productData: PRODUCT_Input!) {
    createProduct(productData: $productData) {
      title
      categories
      description
      purchasePrice
    }
  }
`

const GetProductById = gql`
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
const GetProductForUser = gql`
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

export const CreateNewProduct = (productData: PRODUCT) => {
  return apolloClient.mutate({
    mutation: CreateProduct,
    variables: {
      productData: {
        ...productData,
      },
    },
  })
}

export const CreateNewProductSuccess = async () => {
  await nextTick()
  router.push('/products/my')
}
