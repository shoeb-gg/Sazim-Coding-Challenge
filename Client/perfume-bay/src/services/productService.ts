import { gql } from '@apollo/client/core'
import apolloClient from '../apollo'
import type { PRODUCT } from '@/models/Products.DTO'

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
export const CreateNewProduct = (productData: PRODUCT) => {
  console.log(productData)

  return apolloClient.mutate({
    mutation: CreateProduct,
    variables: {
      productData: {
        ...productData,
      },
    },
  })
}
