<script setup lang="ts">
import ProductTitle from '@/components/Products/add/AddProductTitle.vue'
import AddProductCat from '@/components/Products/add/AddProductCat.vue'
import AddProductDesc from '@/components/Products/add/AddProductDesc.vue'
import AddProductPrice from '@/components/Products/add/AddProductPrice.vue'
import AddProductSummary from '@/components/Products/add/AddProductSummary.vue'
import { AddProductViewStates, type PRODUCT } from '@/models/Products.DTO'
import { ref } from 'vue'
import router from '@/router'
import { CreateNewProduct } from '@/services/productService'

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

const productInfo = ref<PRODUCT>({
  title: '',
  categories: [],
  description: '',
  purchasePrice: 0,
  rentPrice: 0,
  rentDuration: 'per day',
})

const submitProduct = async () => {
  console.log(productInfo.value)
  CreateNewProduct(productInfo.value)
}
</script>

<template>
  <div>{{ productInfo }}</div>
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
