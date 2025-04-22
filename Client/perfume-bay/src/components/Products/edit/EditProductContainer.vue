<script setup lang="ts">
import type { PRODUCT } from '@/models/Products.DTO'
import { getProductById } from '@/services/productService'
import EditProductForm from '@/components/Products/edit/EditProductForm.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const product = ref<PRODUCT>()

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
</script>
<template>
  <div class="w-full flex justify-center">
    <EditProductForm :product="product" />
  </div>
</template>
