<script setup lang="ts">
import ProductTitle from '@/components/Products/add/AddProductTitle.vue'
import AddProductCat from '@/components/Products/add/AddProductCat.vue'
import AddProductDesc from '@/components/Products/add/AddProductDesc.vue'
import AddProductPrice from '@/components/Products/add/AddProductPrice.vue'
import AddProductSummary from '@/components/Products/add/AddProductSummary.vue'
import { AddProductViewStates, type PRODUCT } from '@/models/Products.DTO'
import { ref } from 'vue'
import router from '@/router'
import { CreateNewProduct, CreateNewProductSuccess } from '@/services/productService'
import { useToast } from 'primevue/usetoast'

const AddProductViewState = ref<number>(AddProductViewStates.title)

const moveToNextView = () => {
  if (AddProductViewState.value < AddProductViewStates.summary) {
    AddProductViewState.value++
  }
}
const moveToBackView = async () => {
  if (AddProductViewState.value > AddProductViewStates.title) {
    AddProductViewState.value--
  } else {
    router.back()
  }
}

const toast = useToast()
const showSuccessToast = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Product created successfully !',
    life: 3000,
  })
}
const showErrorToast = () => {
  toast.add({
    severity: 'danger',
    summary: 'Error',
    detail: 'Error creating product',
    life: 3000,
  })
}

const productInfo = ref<PRODUCT>({
  title: '',
  categories: [],
  description: '',
  purchasePrice: 0,
  rentPrice: 0,
  rentDuration: 'per day',
})

const submitProduct = async () => {
  CreateNewProduct(productInfo.value)
    .then((result) => {
      if (result?.data?.createProduct) {
        showSuccessToast()
        CreateNewProductSuccess()
      } else {
        showErrorToast()
      }
    })
    .catch((error) => {
      showErrorToast()
      console.error('Error creating product:', error)
      throw error
    })
}
</script>

<template>
  <ProductTitle
    v-model:title="productInfo.title"
    v-if="AddProductViewState === AddProductViewStates.title"
    @next="moveToNextView()"
    @back="moveToBackView()"
  />
  <AddProductCat
    v-model:categories="productInfo.categories"
    v-if="AddProductViewState === AddProductViewStates.categories"
    @next="moveToNextView()"
    @back="moveToBackView()"
  />
  <AddProductDesc
    v-model:description="productInfo.description"
    v-if="AddProductViewState === AddProductViewStates.description"
    @next="moveToNextView()"
    @back="moveToBackView()"
  />
  <AddProductPrice
    v-model:purchasePrice="productInfo.purchasePrice"
    v-model:rentPrice="productInfo.rentPrice"
    v-model:rentDuration="productInfo.rentDuration"
    v-if="AddProductViewState === AddProductViewStates.price"
    @next="moveToNextView()"
    @back="moveToBackView()"
  />
  <AddProductSummary
    :productInfo="productInfo"
    v-if="AddProductViewState === AddProductViewStates.summary"
    @submit="submitProduct()"
    @back="moveToBackView()"
  />
</template>
