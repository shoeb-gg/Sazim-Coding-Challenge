import { gql } from '@apollo/client/core'
import apolloClient from '../apollo'
import type { PRODUCT } from '@/models/Products.DTO'
import { nextTick } from 'vue'
import router from '@/router'

const CreateProduct = gql`
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
  mutation UpdateProduct($productData: PRODUCT_Input!) {
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
export const createNewProduct = (productData: PRODUCT) => {
  return apolloClient.mutate({
    mutation: CreateProduct,
    variables: {
      productData: {
        ...productData,
      },
    },
  })
}
export const updateProduct = (productData: PRODUCT | undefined) => {
  console.log(productData)

  if (productData) {
    return apolloClient.mutate({
      mutation: UpdateProduct,
      variables: {
        productData: {
          ...productData,
        },
      },
    })
  } else {
    console.error('No Product Edit Data')
  }
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
