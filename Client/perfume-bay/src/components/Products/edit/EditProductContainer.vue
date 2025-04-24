<script setup lang="ts">
import type { PRODUCT } from '@/models/Products.DTO'
import { getProductById, refreshProducts, updateProduct } from '@/services/productService'
import EditProductForm from '@/components/Products/edit/EditProductForm.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { numberInput, textArrayInput, textInput } from '@/services/validationService'
import { useToast } from 'primevue/usetoast'

const product = ref<PRODUCT | undefined>()
const toast = useToast()

onMounted(() => {
  getProductById(useRoute().params.id as string)
    .then((result) => {
      if (result?.data?.getProductById) {
        product.value = result?.data?.getProductById
      }
    })
    .catch((error) => {
      console.error('Error creating product:', error)
      throw error
    })
})

const showValidationErrorToast = () => {
  toast.add({
    severity: 'danger',
    summary: 'Error',
    detail: 'Please make sure all inputs are correct',
    life: 3000,
  })
}
const showErrorToast = () => {
  toast.add({
    severity: 'danger',
    summary: 'Error',
    detail: 'Error updating product',
    life: 3000,
  })
}

const editProduct = () => {
  if (
    // validatng manually all the fields
    textInput(product.value?.title) &&
    textInput(product.value?.description) &&
    textInput(product.value?.rentDuration) &&
    numberInput(product.value?.purchasePrice) &&
    numberInput(product.value?.rentPrice) &&
    textArrayInput(product.value?.categories)
  ) {
    editProductApiCall()
  } else {
    //show error toast when valdiation fails
    showValidationErrorToast()
  }
}

const editProductApiCall = () => {
  const { __typename, ...updatedProduct } = product.value

  updateProduct(updatedProduct)
    .then((result) => {
      console.log(result)
      refreshProducts()
    })
    .catch((error) => {
      showErrorToast()
      console.error('Error creating product:', error)
      throw error
    })
}
</script>
<template>
  <div class="w-full flex justify-center">
    <EditProductForm :product="product" v-model:updatedProduct="product" @submit="editProduct" />
  </div>
</template>
